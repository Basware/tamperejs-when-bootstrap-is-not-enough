import { Breakpoint } from './breakpoint';
import { BreakpointProperties } from './breakpoint-properties';
import { ResizeListenerManager } from './resize-listener-manager';
import { SensorElements } from './sensor-elements';
import { ElementSize } from './element-size';
import { ResizeListenerObservable } from './resize-listener-observable';
import { BreakpointLimits } from './breakpoint-limits';
import { ReplaySubject } from 'rxjs/Rx';
import * as _ from 'lodash';

export class ResizeListener extends ReplaySubject<ElementSize | Breakpoint> {
  private onScrollBinded: () => void;
  private checkWidth: boolean;
  private checkHeight: boolean;
  private lastSize: ElementSize;
  private currentBreakpoint: Breakpoint;
  private sensorElements: SensorElements;

  constructor(private element: HTMLElement, private breakpoints?: Array<Breakpoint>,
    public id?: string, private manager?: ResizeListenerManager) {
    super(1);
    this.initBreakpoints(this.breakpoints);
    this.initSensorElements();
    this.attach();
  }

  public attach() {
    if (this.element.style.position.toLowerCase() === 'static' || !this.element.style.position) {
      this.element.classList.add('resize-listener-target');
    }

    this.element.appendChild(this.sensorElements.wrapper);

    this.attachScrollListeners(this.sensorElements);
  }

  public detach() {
    if (this.element.contains(this.sensorElements.wrapper)) {
      this.element.removeChild(this.sensorElements.wrapper);
    }
    this.detachScrollListeners(this.sensorElements);
  }

  public destroy() {
    this.detach();

    if (this.manager) {
      this.manager.remove(this);
    }
  }

  public update(element: HTMLElement, breakpoints: Array<Breakpoint>) {
    // Update element and breakpoints
  }

  public asObservable(): ResizeListenerObservable {
    return new ResizeListenerObservable(this);
  }

  private attachScrollListeners(sensors: SensorElements) {
    if (!this.onScrollBinded) {
      this.onScrollBinded = this.onScroll.bind(this);
    }

    sensors.expand.sensor.addEventListener('scroll', this.onScrollBinded);
    sensors.shrink.sensor.addEventListener('scroll', this.onScrollBinded);

    this.resetSensorsScrollbars(this.sensorElements);
  }

  private detachScrollListeners(sensors: SensorElements) {
    sensors.expand.sensor.removeEventListener('scroll', this.onScrollBinded);
    sensors.shrink.sensor.removeEventListener('scroll', this.onScrollBinded);
  }

  private onScroll() {
    const size: ElementSize = {
      width: this.sensorElements.wrapper.offsetWidth,
      height: this.sensorElements.wrapper.offsetHeight
    };

    this.resetSensorsScrollbars(this.sensorElements);

    if (_.isEqual(size, this.lastSize)) {
      return;
    }

    this.lastSize = size;

    if (!this.breakpoints) {
      return this.next(size);
    }

    this.checkAndEmitBreakpoint(size);
  }

  private resetSensorsScrollbars(sensors: SensorElements) {
    this.resetSensorScrollbars(sensors.expand.sensor);
    this.resetSensorScrollbars(sensors.shrink.sensor);
  }

  private resetSensorScrollbars(sensor: HTMLElement) {
    sensor.scrollLeft = 100000;
    sensor.scrollTop = 100000;
  }

  private initBreakpoints(breakpoints: Array<Breakpoint>) {
    this.checkWidth = false;
    this.checkHeight = false;

    _.forEach(breakpoints, (breakpoint: Breakpoint) => {
      if (breakpoint.width) {
        this.checkWidth = true;
      }

      if (breakpoint.height) {
        this.checkHeight = true;
      }

      if (this.checkWidth && this.checkHeight) {
        return false;
      }
    });
  }

  private initSensorElements() {
    this.sensorElements = {
      wrapper: document.createElement('div'),
      expand: {
        sensor: document.createElement('div'),
        content: document.createElement('div')
      },
      shrink: {
        sensor: document.createElement('div'),
        content: document.createElement('div')
      }
    };

    this.sensorElements.wrapper.appendChild(this.sensorElements.expand.sensor);
    this.sensorElements.wrapper.appendChild(this.sensorElements.shrink.sensor);

    this.sensorElements.expand.sensor.appendChild(this.sensorElements.expand.content);
    this.sensorElements.shrink.sensor.appendChild(this.sensorElements.shrink.content);

    this.resetSensorElementsStyles(this.sensorElements);
  }

  private resetSensorElementsStyles(sensors: SensorElements) {
    sensors.wrapper.className = 'resize-listener-wrapper';
    sensors.expand.sensor.className = 'resize-listener-expand-sensor';
    sensors.shrink.sensor.className = 'resize-listener-shrink-sensor';
    sensors.expand.content.className = 'resize-listener-expand-content';
    sensors.shrink.content.className = 'resize-linstener-shrink-content';
  }

  private checkAndEmitBreakpoint(size: ElementSize) {
    const breakpoint = this.getBreakpoint(size);

    if (!_.isEqual(this.currentBreakpoint, breakpoint)) {
      this.next(breakpoint);
    }

    this.currentBreakpoint = breakpoint;
  }

  private getBreakpoint(size: ElementSize): Breakpoint {
    const breakpointsLn = this.breakpoints.length;
    const resBreakpoint: Breakpoint = {};

    _.forEach(this.breakpoints, (breakpoint: Breakpoint, index: number) => {
      const next = index < breakpointsLn - 1 ? this.breakpoints[index + 1] : null;
      const prev = index > 0 ? this.breakpoints[index - 1] : null;
      const widthLimits: BreakpointLimits = {
        min: this.getBreakpointMin(breakpoint.width, prev ? prev.width : null),
        max: this.getBreakpointMax(breakpoint.width, next ? next.width : null)
      };
      const heightLimits: BreakpointLimits = {
        min: this.getBreakpointMin(breakpoint.height, prev ? prev.height : null),
        max: this.getBreakpointMax(breakpoint.height, next ? next.height : null)
      };

      if (!resBreakpoint.width && (!widthLimits.max || (widthLimits.max && size.width <= widthLimits.max))
        && (!widthLimits.min || (widthLimits.min && size.width >= widthLimits.min))) {
        resBreakpoint.width = {
          name: breakpoint.width.name,
          class: breakpoint.width.class
        };
      }

      if (!resBreakpoint.height && (!heightLimits.max || (heightLimits.max && size.height <= heightLimits.max))
        && (!heightLimits.min || (heightLimits.min && size.height >= heightLimits.min))) {
        resBreakpoint.height = {
          name: breakpoint.height.name,
          class: breakpoint.height.class
        };
      }

      return resBreakpoint.width && resBreakpoint.height;
    });

    return resBreakpoint;
  }

  private getBreakpointMin(current: BreakpointProperties, prev: BreakpointProperties): number {
    return current ? current.min : (prev ? prev.max : null);
  }

  private getBreakpointMax(current: BreakpointProperties, next: BreakpointProperties) {
    return current ? current.max : (next ? next.min : null);
  }
}

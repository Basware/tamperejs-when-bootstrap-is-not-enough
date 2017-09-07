import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { ResizeListener, ElementSize, Breakpoint, BreakpointProperties } from '../../helpers/resize-listener';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

interface MinMaxValues {
  min?: number;
  max?: number;
}
@Component({
  selector: 'app-breakpoints-demo',
  templateUrl: './breakpoints-demo.component.html',
  styleUrls: ['./breakpoints-demo.component.scss']
})
export class BreakpointsDemoComponent implements OnInit, AfterViewInit {
  protected breakpoints: Array<Breakpoint>;

  private resizeListener: ResizeListener;
  private resizeListenerSubscription: Subscription;
  private currentBreakpoint: Breakpoint;

  @ViewChild('monitorElement', { read: ViewContainerRef }) monitorElement: ViewContainerRef;

  constructor(private elementRef: ElementRef) {
    this.breakpoints = [
      {
        width: {
          name: 'xs',
          class: 'width-xs',
          max: 150
        },
        height: {
          name: 'xs',
          class: 'height-xs',
          max: 150
        }
      },
      {
        width: {
          name: 'md',
          class: 'width-md',
          max: 600
        },
        height: {
          name: 'md',
          class: 'height-md',
          max: 200
        }
      },
      {
        width: {
          name: 'lg',
          class: 'width-lg',
          min: 601
        },
        height: {
          name: 'lg',
          class: 'height-lg',
          min: 201
        }
      }
    ];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.resizeListener = new ResizeListener(this.monitorElement.element.nativeElement);
    this.resizeListenerSubscription = this.resizeListener.asObservable().subscribe(this.onSizeChange.bind(this));
  }

  protected isCurrentWidth(name: string): boolean {
    return this.currentBreakpoint && this.currentBreakpoint.width && this.currentBreakpoint.width.name === name;
  }

  protected isCurrentHeight(name: string): boolean {
    return this.currentBreakpoint && this.currentBreakpoint.height && this.currentBreakpoint.height.name === name;
  }

  protected getMonitorElementWidth(): string {
    return this.monitorElement ? this.monitorElement.element.nativeElement.offsetWidth + ' px' : '-';
  }

  protected getMonitorElementHeight(): string {
    return this.monitorElement ? this.monitorElement.element.nativeElement.offsetHeight + ' px' : '-';
  }

  private onSizeChange(size: ElementSize) {
    const breakpoint = this.getBreakpoint(size);

    if (!this.currentBreakpoint || !this.currentBreakpoint.width || !_.isEqual(this.currentBreakpoint.width, breakpoint.width)) {
      this.updateWidthClass(breakpoint.width);
    }

    if (!this.currentBreakpoint || !this.currentBreakpoint.height || !_.isEqual(this.currentBreakpoint.height, breakpoint.height)) {
      this.updateHeightClass(breakpoint.height);
    }

    this.currentBreakpoint = breakpoint;
  }

  private updateWidthClass(props: BreakpointProperties) {
    const element: HTMLElement = this.monitorElement.element.nativeElement;

    if (this.currentBreakpoint && this.currentBreakpoint.width) {
      element.classList.remove(this.currentBreakpoint.width.class);
    }

    element.classList.add(props.class);
  }

  private updateHeightClass(props: BreakpointProperties) {
    const element: HTMLElement = this.monitorElement.element.nativeElement;

    if (this.currentBreakpoint && this.currentBreakpoint.height) {
      element.classList.remove(this.currentBreakpoint.height.class);
    }

    element.classList.add(props.class);
  }

  private getBreakpoint(size: ElementSize): Breakpoint {
    const breakpointsLn = this.breakpoints.length;
    const resBreakpoint: Breakpoint = {};

    _.forEach(this.breakpoints, (breakpoint: Breakpoint, index: number) => {
      const next = index < breakpointsLn - 1 ? this.breakpoints[index + 1] : null;
      const prev = index > 0 ? this.breakpoints[index - 1] : null;
      const widthLimits: MinMaxValues = {
        min: this.getBreakpointMin(breakpoint.width, prev ? prev.width : null),
        max: this.getBreakpointMax(breakpoint.width, next ? next.width : null)
      };
      const heightLimits: MinMaxValues = {
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

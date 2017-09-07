import { Component, OnInit, AfterViewInit, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import * as _ from 'lodash';

interface ElementSize {
  width: number;
  height: number;
}

@Component({
  selector: 'app-scroll-listeners-demo',
  templateUrl: './scroll-listeners-demo.component.html',
  styleUrls: ['./scroll-listeners-demo.component.scss']
})
export class ScrollListenersDemoComponent implements OnInit, AfterViewInit {

  @ViewChild('sensorExpand', { read: ViewContainerRef }) sensorExpand: ViewContainerRef;
  @ViewChild('sensorShrink', { read: ViewContainerRef }) sensorShrink: ViewContainerRef;
  @ViewChild('monitorElement', { read: ViewContainerRef }) monitorElement: ViewContainerRef;

  protected eventsLog: Array<string>;
  protected stripEqualEvents: boolean;

  private lastSize: ElementSize;

  constructor() {
    this.eventsLog = [];
    this.stripEqualEvents = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initScrollListeners(this.getSensorElements());
  }

  private initScrollListeners(elements: Array<HTMLElement>) {
    _.forEach(elements, element => {
      element.addEventListener('scroll', (event) => { this.onScroll.bind(this)(event, element) });
    });

    this.resetScrollPositions(this.getSensorElements());
  }

  private onScroll(event: Event, element: HTMLElement) {
    const size = this.getElementSize(this.monitorElement.element.nativeElement);

    if (_.isEqual(this.lastSize, size) && this.stripEqualEvents) {
      return;
    }

    this.eventsLog.push(
      element.id + ': ' +
      size.width + ' X ' +
      size.height
    );

    this.lastSize = size;

    this.resetScrollPositions(this.getSensorElements());
  }

  private resetScrollPositions(elements: Array<HTMLElement>) {
    _.forEach(elements, element => {
      element.scrollLeft = 100000;
      element.scrollTop = 100000;
    });
  }

  private getSensorElements(): Array<HTMLElement> {
    return [
      this.sensorExpand.element.nativeElement,
      this.sensorShrink.element.nativeElement
    ];
  }

  private getElementSize(element: HTMLElement): ElementSize {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

}

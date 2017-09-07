import { Directive, Input, HostBinding, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import {
  ResizeListener,
  ResizeListenerManager,
  ResizeListenerObservable,
  ElementSize,
  Breakpoint,
  BreakpointProperties
} from '../../helpers/resize-listener';
import { ResizeListenerService } from '../../services/resize-listener/resize-listener.service';
import * as _ from 'lodash';


@Directive({
  selector: '[appResizeListener]'
})
export class ResizeListenerDirective implements OnInit, OnDestroy {
  @Input() appResizeListener: string;
  @Input() linkToListener: string;
  @Input() breakpoints: Array<Breakpoint>;
  @Input() disableClass: boolean;

  private resizeListener: ResizeListenerObservable;
  private rlSubscription: Subscription;
  private currentConf: Breakpoint | ElementSize;

  constructor(private resizeListenerService: ResizeListenerService, private elementRef: ElementRef) {

  }

  ngOnInit() {
    if (this.linkToListener) {
      this.resizeListenerService.getListener(this.linkToListener)
        .then((resizeListener: ResizeListenerObservable) => {
          this.resizeListener = resizeListener;
          this.initSubscription(resizeListener);
        });
    } else {
      this.resizeListenerService.addListener(this.elementRef.nativeElement, this.breakpoints, this.appResizeListener)
        .then((resizeListener: ResizeListenerObservable) => {
          this.resizeListener = resizeListener;
          this.initSubscription(resizeListener);
        });
    }
  }

  ngOnDestroy() {
    if (this.rlSubscription) {
      this.rlSubscription.unsubscribe();
    }

    if (this.resizeListener) {
      this.resizeListenerService.removeListener(this.resizeListener);
    }
  }

  private onResize(dto: ElementSize | Breakpoint) {
    if (!(_.isNumber(dto.width) || _.isNumber(dto.height)) && !this.disableClass) {
      this.updateClass(<Breakpoint>dto);
    }

    this.currentConf = dto;
  }

  private updateClass(breakpoint: Breakpoint) {
    this.updateWidthClass(breakpoint.width);
    this.updateHeightClass(breakpoint.height);
  }

  private updateWidthClass(props: BreakpointProperties) {
    const element: HTMLElement = this.elementRef.nativeElement;

    if (this.currentConf && this.currentConf.width) {
      element.classList.remove((<BreakpointProperties>this.currentConf.width).class);
    }

    element.classList.add(props.class);
  }

  private updateHeightClass(props: BreakpointProperties) {
    const element: HTMLElement = this.elementRef.nativeElement;

    if (this.currentConf && this.currentConf.height) {
      element.classList.remove((<BreakpointProperties>this.currentConf.height).class);
    }

    element.classList.add(props.class);
  }

  private initSubscription(resizeListener: ResizeListenerObservable) {
    this.rlSubscription = resizeListener.subscribe(this.onResize.bind(this));
  }

}

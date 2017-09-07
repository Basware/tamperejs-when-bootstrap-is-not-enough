import { Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-scrollbar-behaviour',
  templateUrl: './scrollbar-behavior-demo.component.html',
  styleUrls: ['./scrollbar-behavior-demo.component.scss']
})
export class ScrollbarBehaviorDemoComponent {

  @ViewChild('scrollbarFixedContent', { read: ViewContainerRef }) scrollbarFixedContent: ViewContainerRef;
  @ViewChild('scrollbarPercentageContent', { read: ViewContainerRef }) scrollbarPercentageContent: ViewContainerRef;

  constructor() { }

  public resetFixedScrollbar() {
    this.resetScrollbar(this.scrollbarFixedContent);
  }

  public resetPercentageScrollbar() {
    this.resetScrollbar(this.scrollbarPercentageContent);
  }

  private resetScrollbar(vcr: ViewContainerRef) {
    vcr.element.nativeElement.scrollLeft = 100000;
    vcr.element.nativeElement.scrollTop = 100000;
  }
}

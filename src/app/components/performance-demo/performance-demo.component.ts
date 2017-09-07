import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResizeListenerService } from '../../services/resize-listener/resize-listener.service';
import { Breakpoint, ResizeListenerObservable } from '../../helpers/resize-listener';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-performance-demo',
  templateUrl: './performance-demo.component.html',
  styleUrls: ['./performance-demo.component.scss']
})
export class PerformanceDemoComponent implements OnInit, OnDestroy {
  protected breakpoints = [
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

  protected breakpoint1: Breakpoint;
  protected breakpoint2: Breakpoint;
  protected listener1Id = 'custom-id-1';
  protected listener2Id = 'custom-id-2';
  private listener1Subscription: Subscription;
  private listener2Subscription: Subscription;

  constructor(private resizeListenerService: ResizeListenerService) { }

  ngOnInit() {
    this.resizeListenerService.getListener(this.listener1Id).then((resizeListener: ResizeListenerObservable) => {
      this.listener1Subscription = resizeListener.subscribe((breakpoint: Breakpoint) => {
        this.onSizeChange(this.listener1Id, breakpoint);
      })
    });

    this.resizeListenerService.getListener(this.listener2Id).then((resizeListener: ResizeListenerObservable) => {
      this.listener2Subscription = resizeListener.subscribe((breakpoint: Breakpoint) => {
        this.onSizeChange(this.listener2Id, breakpoint);
      })
    });
  }

  ngOnDestroy() {
    if (this.listener1Subscription) {
      this.listener1Subscription.unsubscribe();
    }

    if (this.listener2Subscription) {
      this.listener2Subscription.unsubscribe();
    }
  }

  protected getWidthName(breakpoint: Breakpoint) {
    return breakpoint && breakpoint.width ? breakpoint.width.name : '-';
  }

  protected getHeightName(breakpoint: Breakpoint) {
    return breakpoint && breakpoint.height ? breakpoint.height.name : '-';
  }

  private onSizeChange(listenerId: string, breakpoint: Breakpoint) {
    switch (listenerId) {
      case this.listener1Id:
        this.breakpoint1 = breakpoint;
        break;
      case this.listener2Id:
        this.breakpoint2 = breakpoint;
    }
  }

}

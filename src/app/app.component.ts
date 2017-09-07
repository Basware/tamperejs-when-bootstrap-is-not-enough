import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SlideData } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected title: string;
  private nextRoute: string;
  private prevRoute: string;

  constructor(private router: Router) {
    router.events.subscribe((event: NavigationEnd) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      this.setNavigationState(<SlideData>this.router.routerState.root.firstChild.routeConfig.data);
    })
  }

  @HostListener('document:keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && this.nextRoute) {
      this.router.navigateByUrl('/' + this.nextRoute);
    } else if (event.key === 'ArrowLeft' && this.prevRoute) {
      this.router.navigateByUrl('/' + this.prevRoute);
    }
  }

  private setNavigationState(data: SlideData) {
    if (!data) {
      return;
    }

    this.title = data.title;
    this.nextRoute = data.next;
    this.prevRoute = data.prev;
  }
}

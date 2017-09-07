import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { ScrollbarBehaviorDemoComponent } from './components/scrollbar-behavior-demo/scrollbar-behavior-demo.component';
import { ScrollListenersDemoComponent } from './components/scroll-listeners-demo/scroll-listeners-demo.component';
import { BreakpointsDemoComponent } from './components/breakpoints-demo/breakpoints-demo.component';
import { PerformanceDemoComponent } from './components/performance-demo/performance-demo.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { WhenToUseComponent } from './components/when-to-use/when-to-use.component';
import { ResultDemoComponent } from './components/result-demo/result-demo.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CoverComponent } from './components/cover/cover.component';

export interface SlideData {
  title: string;
  next?: string;
  prev?: string;
}

export interface SlideRoute extends Route {
  data?: SlideData;
}

export declare type SlideRoutes = Array<SlideRoute>;

const routes: SlideRoutes = [
  {
    path: '', redirectTo: 'cover', pathMatch: 'full'
  },
  {
    path: 'cover',
    component: CoverComponent,
    data: {
      title: '',
      next: 'about-me',
    }
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    data: {
      title: 'About Me',
      next: 'when-to-use',
      prev: 'cover'
    }
  },
  {
    path: 'when-to-use',
    component: WhenToUseComponent,
    data: {
      title: 'When To Use',
      next: 'scrollbar-behavior',
      prev: 'about-me'
    }
  },
  {
    path: 'scrollbar-behavior',
    component: ScrollbarBehaviorDemoComponent,
    data: {
      title: 'Scrollbar Behavior',
      next: 'scroll-listeners',
      prev: 'when-to-use'
    }
  },
  {
    path: 'scroll-listeners',
    component: ScrollListenersDemoComponent,
    data: {
      title: 'Scroll Listeners',
      next: 'breakpoints',
      prev: 'scrollbar-behavior'
    }
  },
  {
    path: 'breakpoints',
    component: BreakpointsDemoComponent,
    data: {
      title: 'Breakpoints',
      next: 'performance',
      prev: 'scroll-listeners'
    }
  },
  {
    path: 'performance',
    component: PerformanceDemoComponent,
    data: {
      title: 'More Performance',
      next: 'result',
      prev: 'breakpoints'
    }
  },
  {
    path: 'result',
    component: ResultDemoComponent,
    data: {
      title: 'Result',
      next: 'questions',
      prev: 'performance',
    }
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    data: {
      title: 'Any Questions?',
      next: 'thank-you',
      prev: 'result'
    }
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
    data: {
      title: 'Thank you',
      prev: 'questions'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

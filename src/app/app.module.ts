import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollbarBehaviorDemoComponent } from './components/scrollbar-behavior-demo/scrollbar-behavior-demo.component';
import { ResizeListenerDirective } from './directives/resize-listener/resize-listener.directive';
import { ScrollListenersDemoComponent } from './components/scroll-listeners-demo/scroll-listeners-demo.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PerformanceDemoComponent } from './components/performance-demo/performance-demo.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { WhenToUseComponent } from './components/when-to-use/when-to-use.component';
import { BreakpointsDemoComponent } from './components/breakpoints-demo/breakpoints-demo.component';
import { ResultDemoComponent } from './components/result-demo/result-demo.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

import { ResizeListenerService } from './services/resize-listener/resize-listener.service';
import { CoverComponent } from './components/cover/cover.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { SplitLayoutComponent } from './components/split-layout/split-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollbarBehaviorDemoComponent,
    ResizeListenerDirective,
    ScrollListenersDemoComponent,
    NavigationComponent,
    BreakpointsDemoComponent,
    PerformanceDemoComponent,
    AboutMeComponent,
    WhenToUseComponent,
    BreakpointsDemoComponent,
    ResultDemoComponent,
    QuestionsComponent,
    ThankYouComponent,
    CoverComponent,
    PlaygroundComponent,
    SplitLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ResizeListenerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

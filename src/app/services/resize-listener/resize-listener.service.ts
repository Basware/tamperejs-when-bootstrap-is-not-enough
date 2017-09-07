import { Injectable } from '@angular/core';
import { ResizeListenerManager, ResizeListener, ResizeListenerObservable, Breakpoint } from '../../helpers/resize-listener';

@Injectable()
export class ResizeListenerService {
  private manager: ResizeListenerManager;

  constructor() {
    this.manager = new ResizeListenerManager();
  }

  public getListener(id: string): Promise<ResizeListenerObservable> {
    return this.manager.get(id);
  }

  public addListener(element: HTMLElement, breakpoints: Array<Breakpoint>, id): Promise<ResizeListenerObservable> {
    return this.getListener(
      this.manager.update(element, breakpoints, id).id
    );
  }

  public removeListener(resizeListener: ResizeListenerObservable) {
    this.manager.remove(resizeListener);
  }
}

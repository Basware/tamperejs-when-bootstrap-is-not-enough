import { Observable } from 'rxjs/Rx';
import { ResizeListener } from './resize-listener';
import { ElementSize } from './element-size';
import { Breakpoint } from './breakpoint';

export class ResizeListenerObservable extends Observable<ElementSize | Breakpoint> {
    public get id(): string { return (<ResizeListener>this.source).id; }
    public source: Observable<any>;

    constructor(source: ResizeListener) {
        super();
        this.source = <Observable<ElementSize>>source;
    }
}

import { ResizeListener } from './resize-listener';
import { PendingResolver } from './pending-resolver';
import { Breakpoint } from './breakpoint';
import { ResizeListenerObservable } from './resize-listener-observable';
import * as _ from 'lodash';

export class ResizeListenerManager {
    private resizeListeners: Array<ResizeListener>;
    private pendingResolvers: Array<PendingResolver>;

    constructor() {
        this.resizeListeners = [];
        this.pendingResolvers = [];
    }

    public update(element: HTMLElement, breakpoints?: Array<Breakpoint>, id?: string): ResizeListenerObservable {
        let resizeListener: ResizeListener = this.getResizeListenerById(id);

        if (!resizeListener) {
            resizeListener = new ResizeListener(element, breakpoints, id || this.createUID(), this);
            this.resizeListeners.push(resizeListener);
        } else {
            resizeListener.update(element, breakpoints);
        }

        this.resolvePending(resizeListener);

        return resizeListener.asObservable();
    }

    public get(id: string): Promise<ResizeListenerObservable> {
        return new Promise((resolve: (resizeListener: ResizeListenerObservable) => void) => {
            const resizeListener = this.getResizeListenerById(id);
            const pendingResolver = this.getPendingResolverById(id);
            console.log('pending', resizeListener, pendingResolver);
            if (resizeListener) {
                resolve(resizeListener.asObservable());
            }

            if (!pendingResolver) {
                return this.pendingResolvers.push({
                    id: id,
                    resolvers: [ resolve ]
                });
            } else if (pendingResolver && !resizeListener) {
                pendingResolver.resolvers.push(resolve);
            }
        });
    }

    public remove(resizeListener: ResizeListenerObservable | ResizeListener) {

        _.remove(this.resizeListeners, (rl: ResizeListener) => {
            const isEqual = rl.id === resizeListener.id;

            if (isEqual) {
                rl.detach();
            }

            return isEqual;
        });
    }

    private getResizeListenerById(id: string): ResizeListener {
        if (!id) {
            return null;
        }

        return _.find(this.resizeListeners, { id: id });
    }

    private getPendingResolverById(id: string): PendingResolver {
        return _.find(this.pendingResolvers, { id: id });
    }

    private removePendingResolverById(id: string) {
        _.remove(this.pendingResolvers, (resolver: PendingResolver) => {
            return resolver.id === id;
        });
    };

    private resolvePending(resizeListener: ResizeListener) {
        const pendingResolver = this.getPendingResolverById(resizeListener.id);

        if (!pendingResolver) {
            return;
        }

        _.forEach(pendingResolver.resolvers, (resolve: (resizeListener: ResizeListener) => void) => {
            resolve(resizeListener);
        });

        this.removePendingResolverById(resizeListener.id);
    }

    private createUID(): string {
        const s4 = () => {
            return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        return  s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }
}

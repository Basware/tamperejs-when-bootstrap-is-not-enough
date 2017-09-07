import { ResizeListenerObservable } from './resize-listener-observable';

export interface PendingResolver {
    id: string;
    resolvers: Array<(resizeListener: ResizeListenerObservable) => void>;
}

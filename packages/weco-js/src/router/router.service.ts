import { WatcherInterface } from "../interfaces/watcher.interface";

export interface RouterWatcherInterface {
    handler: () => void;
    redirectTo: string;
}

export class RouterService {

    private static instance: RouterService;

    private watchers: WatcherInterface[] = [];

    constructor() {
        if (RouterService.instance) return RouterService.instance;

        RouterService.instance = this;
    }

    public async addWatcher(watcher: WatcherInterface) {
        this.watchers.push(watcher);
        const handler = await this.evaluateWatcher(watcher, window.location.pathname, true);
        this.processHandlers([handler], () => {});
    }

    private processHandlers(watchers: RouterWatcherInterface[], next: () => any) {
        watchers = watchers.filter((watcher) => !!watcher);
        let hasRedirect = false;
        watchers.forEach((watcher) => {
            if (watcher.redirectTo && !hasRedirect) {
                this.navigate(watcher.redirectTo);
                hasRedirect = true;
            }
        });

        watchers.forEach((watcher) => {
            if (watcher.handler) {
                watcher.handler();
            }
        });
        if (!hasRedirect) next();
    }

    private async evaluateWatcher(watcher: WatcherInterface, newUrl: string, initialEvaluate: boolean = false) {
        if (!watcher.getIsConnected() && !initialEvaluate) return null;
        const evaluateResponse: { redirectTo: string; } = await watcher.evaluate(newUrl);
        if (watcher.hasChanges) {
            return {
                handler: () => watcher.handlerChange(watcher.value),
                ...evaluateResponse
            };
        }
        return null;
    }

    public async navigate(url: string) {

        let changeHandlers: RouterWatcherInterface[] = [];
        for (let i = 0; i < this.watchers.length; i++) {
            const handler = await this.evaluateWatcher(this.watchers[i], url);
            changeHandlers.push(handler);
        }

        this.processHandlers(changeHandlers, () => {

            this.watchers = this.watchers.filter((watcher) => watcher.getIsConnected());
            window.history.pushState({}, "", url);

        });
    }

}
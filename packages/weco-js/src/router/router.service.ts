import { WatcherInterface } from "../interfaces/watcher.interface";

export class RouterService {

    private static instance: RouterService;

    private watchers: WatcherInterface[] = [];

    constructor() {
        if (RouterService.instance) return RouterService.instance;

        RouterService.instance = this;
    }

    public addWatcher(watcher: WatcherInterface) {
        this.watchers.push(watcher);
        this.evaluateWatcher(watcher, window.location.pathname, true);
    }

    private async evaluateWatcher(watcher: WatcherInterface, newUrl: string, initialEvaluate: boolean = false) {
        if (!watcher.getIsConnected() && !initialEvaluate) return;
        await watcher.evaluate(newUrl);
        if (watcher.hasChanges) {
            watcher.handlerChange(watcher.value);
        }
    }

    public async navigate(url: string) {
        for (let i = 0; i < this.watchers.length; i++) {
            await this.evaluateWatcher(this.watchers[i], url);
        }
        window.history.pushState({}, "", url);
    }

}
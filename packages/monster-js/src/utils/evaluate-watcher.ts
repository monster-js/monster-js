import { WatcherInterface } from "../interfaces/watcher.interface";

export function evaluateWatcher(watcher: WatcherInterface, force: boolean = false): boolean {
    if (!watcher.getIsConnected() && !force) return false;
    watcher.evaluate();
    if (watcher.hasChanges) {
        watcher.handlerChange(watcher.value);
        return true;
    }
    return false;
}

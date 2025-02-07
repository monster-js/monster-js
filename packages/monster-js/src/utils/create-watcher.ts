import { WatcherInterface } from '../interfaces/watcher.interface';
import { WebComponentInterface } from '../interfaces/web-component.interface';

export function createWatcher(
  instance: WebComponentInterface,
  initialValue: unknown,
  getIsConnected: () => boolean,
  valueGetter: () => unknown,
  handlerChange: (value?: unknown) => void,
): WatcherInterface {
  const watcher: WatcherInterface = {
    hasChanges: false,
    value: initialValue,
    getIsConnected,
    evaluate() {
      const newValue = valueGetter();
      if (watcher.value === newValue) {
        watcher.hasChanges = false;
      } else {
        watcher.value = newValue;
        watcher.hasChanges = true;
      }
    },
    handlerChange,
  };
  instance.addWatcher(watcher);
  return watcher;
}

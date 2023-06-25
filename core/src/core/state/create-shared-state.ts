import { FunctionComponent } from '../component/interfaces/function-component.interface';
import { ChangeCallback } from './interfaces/change-callbacks.interface';
import { DevToolChangeDetection } from './interfaces/dev-tool-change-detection.interface';
import { runChangeCallbacks } from './utils/run-change-callbacks';
import { runChangeDetections } from './utils/run-change-detections';

interface LocalState<T> {
    state: T;
}

type ReturnType<T> = [() => T, (newValue: T) => void];

export function createSharedState<T = any>(initialValue: T) {
    let changeDetections: DevToolChangeDetection[] = [];
    let changeCallbacks: ChangeCallback[] = [];
    const localState: LocalState<T> = {
        state: initialValue
    };

    return function(context: FunctionComponent, callback?: (value?: T) => void): ReturnType<T> {
        const getter = () => localState.state;
        const setter = (value: T) => {
            if (value !== localState.state) {
                localState.state = value;

                changeCallbacks = runChangeCallbacks(changeCallbacks, value);
                changeDetections = runChangeDetections(changeDetections);
            }
        }

        changeDetections.push({
            isConnected: () => context.__wrapper.isConnected,
            changeDetection: () => context.__wrapper.detectChanges()
        });

        if (callback) changeCallbacks.push({
            isConnected: () => context?.__wrapper?.isConnected,
            callback
        });

        return [getter, setter];
    };
}


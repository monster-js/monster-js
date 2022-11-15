import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { DevTool } from "../utils/dev-tool";
import { ChangeCallback } from "./interfaces/change-callbacks.interface";
import { DevToolChangeDetection } from "./interfaces/dev-tool-change-detection.interface";
import { UseStateReturn } from "./types/use-state-return.type";
import { runChangeCallbacks } from "./utils/run-change-callbacks";
import { runChangeDetections } from "./utils/run-change-detections";

let state = {};
let changeCallbacks: { [key: string]: ChangeCallback[]; } = {};
let changeDetections: DevToolChangeDetection[] = [];

export function createSharedState<T>(name: string, value?: T) {
    changeCallbacks[name] = [];

    const devTool = new DevTool();
    devTool.setup(() => {
        devTool.subscribe(message => {
            if (message.type === 'DISPATCH' && message.state) {
                const newSate = JSON.parse(message.state);

                for (const key in newSate) state[key] = newSate[key];

                changeDetections = runChangeDetections(changeDetections);
            }
        });
        devTool.init(state);
    });

    state[name] = value;
    devTool.send(`Init : ${name}`, state);

    return function(context: ComponentInstance, callback?: (value?: T) => void): UseStateReturn<T> {
        changeDetections.push({
            isConnected: () => context.__wrapper.isConnected,
            changeDetection: () => context.__wrapper.detectChanges()
        });

        if (callback) changeCallbacks[name].push({
            isConnected: () => context.__wrapper.isConnected,
            callback
        });

        const getter = () => state[name];
        const setter = (value: T, devToolMessage: string = `SET : ${name}`) => {
            if (value !== state[name]) {
                state[name] = value;

                changeCallbacks[name] = runChangeCallbacks(changeCallbacks[name], value);
                changeDetections = runChangeDetections(changeDetections);

                devTool.send(devToolMessage, state);
            }
        }

        return [getter, setter];
    }
}
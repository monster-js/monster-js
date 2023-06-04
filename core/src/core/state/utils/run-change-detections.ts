import { DevToolChangeDetection } from "../interfaces/dev-tool-change-detection.interface";

export function runChangeDetections(changeDetections: DevToolChangeDetection[]): DevToolChangeDetection[] {
    changeDetections = [...new Set(changeDetections)].filter(item => item.isConnected());
    changeDetections.forEach(item => item.changeDetection());
    return changeDetections;
}

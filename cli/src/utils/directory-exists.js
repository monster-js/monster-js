import { existsSync } from 'fs';

export function directoryExists(path) {
    return existsSync(path);
}
import { rmSync } from 'fs';

export function removeDirectory(path) {
    rmSync(path, { recursive: true, force: true });
}
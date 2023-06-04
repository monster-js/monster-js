import { FunctionComponent } from '../component/interfaces/function-component.interface';
import { onChangeDetection } from './on-change-detection';
import { onInit } from './on-init';

export function useEffect(context: FunctionComponent, callback: () => void, paramsCaller: (() => any[]) = () => []) {
    let params: any[] = [];
    onInit(context, () => callback());
    onChangeDetection(context, () => {
        let hasChanges = false;

        const newParams = paramsCaller();
        newParams.forEach((param, index) => {
            if (params[index] !== param) {
                hasChanges = true;
            }
        });

        if (hasChanges) {
            callback();
            params = newParams;
        }
    });
}
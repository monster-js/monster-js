export class GlobalStyle {
    private static instance: GlobalStyle;
    private data = new Map<any, number>();
    private element = new Map<any, HTMLStyleElement>();
    constructor() {
        if (GlobalStyle.instance) {
            return GlobalStyle.instance;
        }

        GlobalStyle.instance = this;
    }

    add(key: any, styleStr: string) {
        let count = this.data.get(key) || 0;

        if (count === 0) {
            const element = document.createElement('style');
            element.innerHTML = styleStr;
            this.element.set(key, element);
            document.head.appendChild(element);
        }

        count++;
        this.data.set(key, count);
    }

    remove(key: any) {
        let count: number = this.data.get(key)!;
        count--;
        this.data.set(key, count);

        if (count === 0) {
            this.element.get(key)!.remove();
            this.data.delete(key);
            this.element.delete(key);
        }

    }
}

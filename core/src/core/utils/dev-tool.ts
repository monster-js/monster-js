export class DevTool {
    private static instance: DevTool;

    private devTool;
    private doneSetup: boolean = false;

    constructor() {
        if (DevTool.instance) return DevTool.instance;

        if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) this.devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();

        DevTool.instance = this;
    }

    setup(callback: () => void) {
        if (!this.doneSetup) callback();
        this.doneSetup = true;
    }

    subscribe(handler: (message?: any) => void) {
        if (this.devTool) this.devTool.subscribe(handler);
    }

    init(state: { [key: string]: any; }) {
        if (this.devTool) this.devTool.init(state);
    }

    send(action: string, state: { [key: string]: any; }) {
        if (this.devTool) this.devTool.send(action, state);
    }
}

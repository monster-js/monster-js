export interface WebComponent extends CustomElementConstructor {
    new(...args: any[]): any;
    isMonster: boolean;
}
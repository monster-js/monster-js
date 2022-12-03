import { Subscription } from "../interfaces/subscription.interface";

export class Subject {
    private subscribers: ((...args: any[]) => void)[] = [];

    public subscribe(callback: (...args: any[]) => void): Subscription {
        this.subscribers.push(callback);

        return {
            unsubscribe: () => this.subscribers = this.subscribers.filter(item => item !== callback)
        };
    }

    public next(event: any) {
        this.subscribers.forEach(item => item(event));
    }
}

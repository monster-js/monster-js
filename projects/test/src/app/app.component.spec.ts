import { componentTester } from '@monster-js/tester';
import { app } from './app.component';

describe('app.component', function() {
    const tester = componentTester(app);

    it('should create component', function() {
        const { element, host } = tester.render();
        expect(element).toBeTruthy();
        expect(host).toBeTruthy();
    });
});
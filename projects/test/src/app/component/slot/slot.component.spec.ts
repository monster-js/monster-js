import { componentTester } from '@monster-js/tester';
import { slot } from './slot.component';

describe('slot.component', function() {

    const { render } = componentTester(slot);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
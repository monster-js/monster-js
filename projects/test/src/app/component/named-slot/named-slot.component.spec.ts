import { componentTester } from '@monster-js/tester';
import { namedSlot } from './named-slot.component';

describe('named-slot.component', function() {

    const { render } = componentTester(namedSlot);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
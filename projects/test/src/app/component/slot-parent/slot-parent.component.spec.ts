import { getSelector } from '@monster-js/core';
import { componentTester } from '@monster-js/tester';
import { slot } from '../slot/slot.component';
import { slotParent } from './slot-parent.component';

describe('slot-parent.component', function() {

    const { render } = componentTester(slotParent, {
        externalComponents: [getSelector(slot)]
    });

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
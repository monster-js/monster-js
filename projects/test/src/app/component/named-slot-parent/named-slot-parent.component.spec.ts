import { componentTester } from '@monster-js/tester';
import { namedSlotParent } from './named-slot-parent.component';

describe('named-slot-parent.component', function() {

    const { render } = componentTester(namedSlotParent);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
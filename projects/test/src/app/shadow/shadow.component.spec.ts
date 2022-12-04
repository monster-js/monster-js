import { componentTester } from '@monster-js/tester';
import { shadow } from './shadow.component';

describe('shadow.component', function() {

    const { render } = componentTester(shadow);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
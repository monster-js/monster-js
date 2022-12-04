import { componentTester } from '@monster-js/tester';
import { normal } from './normal.component';

describe('normal.component', function() {

    const { render } = componentTester(normal);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
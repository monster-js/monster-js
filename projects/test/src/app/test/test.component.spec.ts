import { componentTester } from '@monster-js/tester';
import { test } from './test.component';

describe('test.component', function() {

    const { render } = componentTester(test);

    it('should create the component', function() {
        const { host } = render();
        expect(host).toBeTruthy();
    });

});
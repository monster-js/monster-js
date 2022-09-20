import { FunctionComponent } from "../interfaces/function-component.interface";
import { components } from "./components";

describe('components', function() {

    it('should be able to append child components to function component', function() {
        function app() { return null; }
        class child1 extends HTMLElement { }
        class child2 extends HTMLElement { }

        components(app, [ child1, child2 ]);

        expect((app as FunctionComponent).children.length).toBe(2);
        expect((app as FunctionComponent).children[0]).toBe(child1);
        expect((app as FunctionComponent).children[1]).toBe(child2);
    });

});
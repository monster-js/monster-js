---
sidebar_position: 2
---

# Component testing

Testing our MonsterJS components can help us check that our components are working properly.
MonsterJS provides a testing tools found in `@monster-js/tester` package.
These tools can help us validate that all our components are performing as expected.

## The componentTester function

`import { componentTester } from '@monster-js/tester'`

The `componentTester` function helps us to create a tester instance based on the provided component.

Example.

```typescript
import { greeting } from './greeting.component';
import { componentTester } from '@monster-js/tester';

const tester = componentTester(greeting);
```

The `componentTester` function has two arguments.
First is the component that we want to create a tester instance and second is an optional argument which is an object that has the following properties.

| Property | Type | Description |
| --- | --- | --- |
| components | Array | Array of components we want to define. |
| externalComponents | Array | Array of component selectors which we want our test to treat as external components. |

Example.

```typescript
import { greeting } from './greeting.component';
import { greetingChild } from './greeting-child.component';
import { componentTester } from '@monster-js/tester';

const tester = componentTester(greeting, {
    components: [greetingChild],
    externalComponents: ['app-external-component']
});
```

Child components that are not needed in testing the current component should be registered as external component.

## The tester.createComponent function

After creating a tester instance, we can now call the `createComponent` method to build the component and return an object that contains the following properties.

| Property | Type | Description |
| --- | --- | --- |
| host | HTMLElement | The host element of the component. Can be converted to component using `parseComponent` function. |
| element | HTMLElement | The DOM element version of the component's template. |
| component | Object | The component instance. |
| shadowRoot | Object | The shadow root of a shadow dom component. |

Example.

```typescript
import { greeting } from './greeting.component';
import { componentTester } from '@monster-js/tester';

const tester = componentTester(greeting);

it('should create a component', function() {
    const { host, element, shadowRoot } = tester.createComponent();
    expect(host).toBeTruthy();
    expect(element).toBeTruthy();
    expect(shadowRoot).toBeTruthy();
});
```

## The parseComponent function

`import { parseComponent } from '@monster-js/tester'`

This will convert an element to component and return an object that has the same structure as the one returned by the `tester.createComponent` method.
If the element is not a component, it will throw an error.

Example.

```typescript
import { greeting } from './greeting.component';
import { greetingChild } from './greeting-child.component';
import { componentTester, parseComponent } from '@monster-js/tester';

const tester = componentTester(greeting, {
    components: [greetingChild]
});

it('should have the child component', function() {
    const greeting = tester.createComponent();
    const childElement = greeting.element.querySelector('app-greeting-child');
    const { host, element, shadowRoot } = parseComponent(childElement);
    expect(host).toBeTruthy();
    expect(element).toBeTruthy();
    expect(shadowRoot).toBeTruthy();
});
```

## The render function

`import { render } from '@monster-js/tester'`

This will render the component that is already defined using `customElement.define` and return an object that has the same structure as the one returned by the `tester.createComponent` method.

Example.

```typescript
import { greeting } from './greeting.component';
import { greetingChild } from './greeting-child.component';
import { componentTester, render } from '@monster-js/tester';

const tester = componentTester(greeting, {
    components: [greetingChild]
});

it('should be able to render child component', function() {
    const { host, element, shadowRoot } = render(greetingChild);
    expect(host).toBeTruthy();
    expect(element).toBeTruthy();
    expect(shadowRoot).toBeTruthy();
});
```

## The fireEvent function

`import { fireEvent } from '@monster-js/tester'`

This will fire an event of an an element like click, dblclick, input and other events.

Example.

```typescript
import { fireEvent, componentTester } from '@monster-js/tester';
import { counter } from './counter.component';

const tester = componentTester(counter);

it('should increment the counter when button is clicked', function() {
    const { element } = tester.createComponent();
    const btn = element.querySelector('button');
    const span = element.querySelector('.count-holder');
    fireEvent(btn, 'click')
    expect(span.textContent).toBe('1');
});
```

The `fireEvent` function has the following arguments.

| Parameter | Type | Description |
| --- | --- | --- |
| element | Element | That target html element of the event we want to fire. |
| eventType | Element | That target html element of the event we want to fire. |

## The inputText function

`import { inputText } from '@monster-js/tester'`

The `inputText` function allows us to emulate a user typing into an input box.

Example.

```typescript
import { inputText, componentTester } from '@monster-js/tester';
import { counter } from './counter.component';

const tester = componentTester(counter);

it('should display the inputted text to text holder', function() {
    const { element } = tester.createComponent();
    const input = element.querySelector('input');
    const span = element.querySelector('.text-holder');
    inputText(input, 'Hello World');
    expect(span.textContent).toBe('Hello World');
});
```

If it has only two arguments the function is synchronous and asynchronous if it has a third argument which is the input delay in milliseconds.

Example.

```typescript
import { inputText, componentTester } from '@monster-js/tester';
import { counter } from './counter.component';

const tester = componentTester(counter);

it('should display the inputted text to text holder', async function() {
    const { element } = tester.createComponent();
    const input = element.querySelector('input');
    const span = element.querySelector('.text-holder');
    await inputText(input, 'Hello World', 100);
    expect(span.textContent).toBe('Hello World');
});
```

The arguments of `inputText(element, text, delay)` are the following.

| Argument | Type | Description |
| --- | --- | --- |
| element | Element | The element where the text should be inputted. |
| text | string | The text that will be inputted in the element. |
| delay | number | The delay of the input event for the next character when typing. |

# Standalone Component

A standalone component in **Weco Js** is a self-contained web component that can be integrated into any JavaScript-based website or application.

## Building a Standalone Component

To build standalone components, use the following command:

```bash
weco build --standalone
```

### Input and Output

* The command will look for files inside the `./src/standalone` directory.
* The output files will be generated in the `./dist/standalone` directory.

For example:

* If you have `button.component.ts` and `message.component.ts` in the `./src/standalone` directory, running the command will produce:
    * `./dist/standalone/button.js`
    * `./dist/standalone/message.js`

These files are standalone web components ready for use.

### File Structure

Each `.component.ts` file should contain an `export default` definition, like this:

`src/standalone/button.component.ts`

```ts
import { createComponent } from "weco-js";
import { Button } from "../app/button.component";

export default createComponent(Button);
```

The imported `Button` from `../app/button.component` is the actual button component.

`src/standalone/message.component.ts`

```ts
import { createComponent } from "weco-js";
import { Message } from "../app/message.component";

export default createComponent(Message);
```

The imported `Message` from `../app/message.component` is the actual message component.

The class names in the generated JavaScript files are derived from the file names:

* `src/standalone/button.component.ts` generates a class named `Button`.
* `src/standalone/message.component.ts` generates a class named `Message`.

## Using the Standalone Components

To use the generated standalone components, include the output files in your HTML and define the web components:

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>

    <app-button></app-button> <!-- Example usage of a web component -->
    <app-message></app-message> <!-- Another web component -->

    <!-- Include the generated files -->
    <script src="./dist/standalone/button.js"></script>
    <script src="./dist/standalone/message.js"></script>

    <!-- Define the custom elements -->
    <script>
        customElements.define('app-button', Button);
        customElements.define('app-message', Message);
    </script>
</body>
</html>
```
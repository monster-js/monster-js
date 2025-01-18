# Standalone Component

A standalone component in **Monster Js** is a self-contained web component that can be integrated into any JavaScript-based website or application.

## Building a Standalone Component

To build standalone components, use the following command:

```bash
mn build --standalone
```

### Input and Output

* The command will look for files inside the `./src/standalone` directory.
* The output files will be generated in the `./dist/standalone` directory.

* For example:
    * If you have `app-button.component.ts` and `app-message.component.ts` in the `./src/standalone` directory, running the command will produce:
        * `./dist/standalone/app-button.js`
        * `./dist/standalone/app-message.js`

These files are standalone web components ready for use.

## File Naming Convention

To maintain consistency and ease of use, it is recommended that the file name in the `standalone` folder matches the selector of the component.

### Naming Guidelines

* If your component's tag name is `<app-button>`, then the file name should be `app-button.component.ts`.
* This will result in an output file named `app-button.js`.
* When you include this file in your HTML, the web component will automatically register itself with the same tag name using `customElements.define`.

### Why Use This Convention?
* It ensures clarity by linking the file name to the web component's tag name.
* It simplifies usage in templates, making it easy to identify the corresponding file and tag name.

## Example File Structure
Each `.component.ts` file should contain an `export default` definition, like this:

`src/standalone/app-button.component.ts`

```ts
import { createComponent } from "monster-js";
import { ButtonComponent } from "../app/button.component";

export default createComponent(ButtonComponent);
```

The imported `ButtonComponent` from `../app/button.component` is the actual button component.

`src/standalone/app-message.component.ts`

```ts
import { createComponent } from "monster-js";
import { MessageComponent } from "../app/message.component";

export default createComponent(MessageComponent);
```

The imported `MessageComponent` from `../app/message.component` is the actual message component.

## Using the Standalone Components

To use the generated standalone components, include the output files in your HTML and you can now use the selectors in your document body:

### Example HTML Usage

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
    <script src="./dist/standalone/app-button.js"></script>
    <script src="./dist/standalone/app-message.js"></script>
</body>
</html>
```

When the script file `app-button.js` is included, it automatically registers the web component `<app-button>` using `customElements.define`.

By following this naming convention, you ensure a seamless connection between the component's file name, tag name, and usage in templates. This approach simplifies both development and debugging processes.

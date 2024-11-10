# Standalone Component

A standalone component in **Weco Js** is a self-contained web component that can be integrated into any JavaScript-based website or application.

## Building a Standalone Component

To build a standalone component, use the following command:

```bash
weco build --standalone path/to/component/button.component.tsx --output path/to/output/button.component.js
```

* The `--output` option is optional. If not specified, it defaults to `./dist/standalone/button.component.js`.

This command generates a JavaScript file, such as `path/to/output/button.component.js`, containing a class definition like:

```js
class ButtonComponent extends HTMLElement {
    ...
}
```

To customize the class name, add the `--name=<class name>` option:

```bash
weco build --standalone path/to/component/button.component.tsx --output path/to/output/button.component.js --name=CustomBtnComponent
```

### Using the `.standalone.json` Configuration File

You can also configure standalone components with a `.standalone.json` file, allowing for a simpler build command:

```bash
weco build --standalone
```

The command above will look for a `.standalone.json` file, which might look like this:

```json
{
    "components": [
        {
            "input": "./path/to/component/button.component.tsx",
            "output": "./dist/standalone/button.component.js",
            "name": "CustomButtonComponent"
        }
    ]
}
```

To build multiple standalone components, include them in the `components` array within the `.standalone.json` file:

```json
{
    "components": [
        {
            "input": "./path/to/component/button.component.tsx",
            "output": "./dist/standalone/button.component.js",
            "name": "CustomButtonComponent"
        },
        {
            "input": "./path/to/component/button-2.component.tsx",
            "output": "./dist/standalone/button-2.component.js",
            "name": "CustomButton2Component"
        }
    ]
}
```

## Using the Standalone Component

To use a standalone web component, include the generated output file in your HTML and register the component as shown below:

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>

    <my-button></my-button> <!-- Your component will output in here -->
    
    <script src="/path/to/component/button.component.js"></script> <!-- Include your component -->
    <script>
        // define the component
        customElements.define("my-button", ButtonComponent);
    </script>
</body>
</html>
```

This approach allows you to integrate standalone **Weco Js** components seamlessly into your project.

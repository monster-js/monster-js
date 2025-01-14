# Defining a State

In this section, we will focus on how to define the state in the Monster JS Store. The state is where all your application's data is stored, and properly defining it is essential for managing and accessing that data efficiently.

## 1. Defining the State Structure

To define the state in Monster JS, you start by creating an interface that outlines the structure of the state. This interface will act as a blueprint for how your store’s data is organized.

Here’s an example of how to define a `StoreState` with a `counter` object containing a `count` value:
```ts
interface StoreState {
    counter: {
        count: number;
    };
}
```
* **StoreState**: This interface defines the overall structure of the state. In this case, the state has a `counter` object with a `count` property, which is a number.

## 2. Initializing the State

Once the state structure is defined, you need to provide an initial state. The initial state is the default value of the state when the application starts.

Here’s how you can define the initial state for the `StoreState`:
```ts
const initialState: StoreState = {
    counter: {
        count: 0
    }
};
```
* **initialState**: This constant holds the initial values for the store. The `count` starts at `0`.

## 3. Creating the Store

After defining the state and initial state, you can create the store by passing the state structure (`StoreState`), the initial state (`initialState`), and optionally, the action reducers (which we will cover in a separate documentation).

Here’s how you create the store:
```ts
const actionReducers = {
    counter: { }
};

export const store = createStore<StoreState>(initialState, actionReducers);
```
* **createStore**: This function initializes the store with the given state structure and initial values. It will allow you to manage and update the state throughout your application.

## Recap
* **Defining the state structure**: Use an interface to define the expected shape of the state.
* **Initializing the state**: Set the default values for the state properties.
* **Creating the store**: Use `createStore` to initialize the store and pass the state structure and initial state.

By defining the state in this way, you ensure that your application’s data is structured, maintainable, and easy to access.

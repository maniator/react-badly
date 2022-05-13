# react-badly

Take hold of your react lifecycle hooks with `react-badly`

[![npm version](https://badge.fury.io/js/react-badly.svg)](https://badge.fury.io/js/react-badly)

You can install off of npm with

```shell
npm install react-badly

# or yarn

yarn add react-badly
```

This component is a wrapper for any of your React 16+ plus components that may have an error in them.


### How to use

The simplest way is to just wrap any component that you think may error with `ReactBadly`

This will prevent the component from rendering (also will stop any children in the tree as well).
This is to make sure that your **whole** component tree does not dismount as React 16+ does.

```jsx harmony
import ReactBadly from 'react-badly';


// some code later on

<ReactBadly>
  <SomeComponentThatMayHaveAnError>
    ...
  </SomeComponentThatMayHaveAnError>
</ReactBadly>
```

If you want to handle your error with some functionality (like sending to analytics etc) you can pass an `onError` 
property which will get the error and any info as parameters from react.

```jsx harmony
import ReactBadly from 'react-badly';

const errorFunction = (error, info) => {
  // can handle the error here and do what you will with it
};

// some code later on

<ReactBadly onError={errorFunction}>
  <SomeComponentThatMayHaveAnError>
    ...
  </SomeComponentThatMayHaveAnError>
</ReactBadly>
```

There may also be some cases where you actually want to render something else to display if there was an error instead 
of just not displaying anything. To do that you can pass the `render` property which will accept a function that will 
take in `{ error, info }` as a parameter. This will render **instead** of the direct child of `ReactBadly`.

```jsx harmony
import ReactBadly from 'react-badly';

const renderError = ({ error, info }) => (
  <React.Fragment>
      <h2>You have an error!</h2>
      <pre>{JSON.stringify(error)}'\n'{JSON.stringify(info)}</pre>
  </React.Fragment>
);

// some code later on

<ReactBadly render={renderError}>
  <SomeComponentThatMayHaveAnError>
    ...
  </SomeComponentThatMayHaveAnError>
</ReactBadly>
```


# react-waypoint-decorator

> Decorator to apply waypoints to React components

[![Travis](https://img.shields.io/travis/ueno-llc/react-waypoint-decorator.svg?maxAge=2592000)](https://travis-ci.org/ueno-llc/react-waypoint-decorator) [![npm](https://img.shields.io/npm/v/react-waypoint-decorator.svg?maxAge=2592000)](https://www.npmjs.com/package/react-waypoint-decorator)

[react-waypoint](https://github.com/brigade/react-waypoint) is a library that allows you to run code when an element scrolls into view. This is a decorator that wraps a React component in a waypoint, and passes down an `activated` prop to that component the first time it scrolls into view. It's especially handy for animating elements in as the user scrolls down the page.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [The Basics](#the-basics)
  - [Output HTML](#output-html)
  - [Passing Options](#passing-options)
  - [Deriving Options from Props](#deriving-options-from-props)
  - [Responding to Activation](#responding-to-activation)
  - [Component Version](#component-version)
- [API](#api)
- [Local Development](#local-development)
- [License](#license)

## Installation

```bash
npm install react-waypoint-decorator
```

This package has one peer dependency, React:

```json
{
  "peerDependencies": {
    "react": ">=16.2.0"
  }
}
```

## Usage

### The Basics

This is the most basic form of a scroll trigger. This component will receive an `activated` prop, which is either `true` or `false` depending on if the component has scrolled into view yet. By default, "scrolled into view" means that the _top edge of the element_ is at least _halfway up the page_. You can fine-tune this threshold by passing an options object to the decorator.

```jsx
import React, { Component } from 'react';
import waypoint from 'react-waypoint-decorator';

@waypoint()
export default class Box extends Component {
  render() {
    if (this.props.activated) {
      return <p>You can see me!</p>;
    }

    return <p>You can't see me yet.</p>;
  }
}
```

Note that this example uses the experimental decorator syntax. If you use Babel to transpile JavaScript, you can add decorator support with the [decorators transform plugin](https://babeljs.io/docs/plugins/transform-decorators/).

If your setup doesn't support decorators, you can also call the decorator as a function.

```jsx
import React, { Component } from 'react';
import waypoint from 'react-waypoint-decorator';

class Box extends Component {
  render() {
    if (this.props.activated) {
      return <p>You can see me!</p>;
    }

    return <p>You can't see me yet.</p>;
  }
}

export default waypoint()(Box);
```

### Output HTML

The new component created by the decorator will wrap your component and its waypoint in a plain `<div />`. This means your component will now be block-level, and generally fill the width of its container. Keep this in mind when adding waypoints, particularly if you use a grid system. If you style a component to have a percentage width, and then wrap it in a waypoint, the percentage width won't be applied, because the component is now wrapped in a full-width `<div />`.

```jsx
<div>
  <Waypoint />
  <YourComponent />
</div>
```

### Passing Options

You can pass an object of options to the decorator to customize the waypoint. For example, the `activatedProp` option lets you change the name of the "activated" prop passed to the component. Refer to the [full list of options](#waypointoptions) below.

```jsx
@waypoint({
  activatedProp: 'visible',
  offset: 25,
})
class Box extends Component {}
```

### Deriving Options from Props

Instead of passing an object to the `waypoint()` decorator, you can also pass a function gets the component props as a parameter, and returns options.

```jsx
@waypoint(props => ({
  offset: props.offset,
}))
class Box extends Component {}
```

### Responding to Activation

To run code when a component scrolls into view, use `componentDidUpdate()`. Or, to update state in response to the scroll event, use [`getDerivedStateFromProps()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops).

```jsx
@waypoint
class Box extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.activated && this.props..activated) {
      // If we're here, then the component has scrolled into view for the first time
    }
  }
}
```

### Component Version

The decorator tracks the scroll position of the _entire_ component. If you only want to monitor a specific chunk of a component, we've got you covered with the `<Waypoint />` component.

```jsx
import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint-decorator';

export default class Box extends Component {
  render() {
    return (
      <div>
        <p>This part of the component isn't being monitored.</p>
        <Waypoint>
          {activated => (
            <p>But this part is.{activated && ' And it\'s scrolled into view!'}</p>
          )}
        </Waypoint>
      </div>
    );
  }
}
```

The `<Waypoint />` component takes a render function as a child. The function has one parameter, `activated`, which is `true` or `false` depending on if that chunk of HTML has scrolled into view yet.

## API

### `waypoint(options)`

Create a waypoint decorator with custom settings.

- **options** (object|function): waypoint settings. It can be an object or a function that takes props and returns an object. Either way, the object can have any of these properties:
  - **autoRun** (boolean): trigger the waypoint immediately, regardless of where it is when the page loads. Useful if you have something above the fold that needs to animate in no matter what.
  - **activatedProp** (string): name of boolean prop to pass to wrapped component. Default is `activated`.
  - **offset** (number): percentage offset from the bottom of the window that triggers a waypoint. The default is `50`, which means the top edge of the component must be 50% of the way up the screen to trigger the waypoint. Higher numbers make components trigger later, while lower numbers make them trigger sooner.
  - **wrapper** (function): HTML to wrap the waypoint and component in. By default it's a `<div />`. To change this, pass a function to this object that takes one parameter, `children`, and returns JSX.

Returns a decorated React component.

### `<Waypoint />`

React component that wraps the output of a render function in a waypoint. The render function takes these parameters:

- **activated** (boolean): if the component has scrolled into view yet.

The `<Waypoint />` component takes these props:

- **autoRun** (boolean): trigger the waypoint immediately, regardless of where it is when the page loads. Useful if you have something above the fold that needs to animate in no matter what.
- **offset** (number): percentage offset from the bottom of the window that triggers a waypoint. The default is `50`, which means the top edge of the component must be 50% of the way up the screen to trigger the waypoint. Higher numbers make components trigger later, while lower numbers make them trigger sooner.
- **wrapper** (function): HTML to wrap the waypoint and component in. By default it's a `<div />`. To change this, pass a function to this object that takes one parameter, `children`, and returns JSX.

## Local Development

```bash
git clone https://github.com/ueno-llc/react-waypoint-decorator
cd react-waypoint-decorator
npm install
npm test
```

## License

MIT &copy; [ueno.](http://ueno.co)

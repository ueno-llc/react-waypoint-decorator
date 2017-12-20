# react-waypoint-decorator

> Decorator to apply waypoints to React components

[![Travis](https://img.shields.io/travis/ueno-llc/react-waypoint-decorator.svg?maxAge=2592000)](https://travis-ci.org/ueno-llc/react-waypoint-decorator) [![npm](https://img.shields.io/npm/v/react-waypoint-decorator.svg?maxAge=2592000)](https://www.npmjs.com/package/react-waypoint-decorator)

[react-waypoint](https://github.com/brigade/react-waypoint) is a library that allows you to run code when an element scrolls into view. This is a decorator that wraps a React component in a waypoint, and passes down an `activated` prop to that component when it scrolls into view. It allows you to easily set up scroll triggers for components.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [The Basics](#the-basics)
  - [Output HTML](#output-html)
  - [Passing Options](#passing-options)
  - [Reusing Options](#reusing-options)
  - [Responding to Activation](#responding-to-activation)
  - [Component Version](#component-version)
- [API](#api)
- [Local Development](#local-development)
- [License](#license)

## Installation

```bash
npm install react-waypoint-decorator
```

## Usage

## The Basics

This is the most basic form of a scroll trigger. This component will receive an `activated` prop, which is either `true` or `false` depending on if the component has scrolled into view. By default, "scrolled into view" means that the _top edge of the element_ is at least _halfway up the page_. You can fine-tune this threshold by passing an options object to the decorator.

```jsx
import React, { Component } from 'react';
import waypoint from 'react-waypoint-decorator';

@waypoint
export default class Box extends Component {
  render() {
    if (this.props.activated) {
      return <p>You can see me!</p>;
    }

    return <p>You can't see me yet.</p>;
  }
}
```

Note that this syntax uses the experimental decorator syntax. If you use Babel to transpile JavaScript, you can add decorator support with the [decorators transform plugin](https://babeljs.io/docs/plugins/transform-decorators/).

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

export default waypoint(Box);
```

### Output HTML

The new component created by the decorator will wrap your component and its waypoint in a plain `<div />`. This means your component will now be block-level, and generally fill the width of its container. Keep this in mind when adding waypoints, particularly if you use a grid system. If you style a component to have a percentage width, and then wrap it in a waypoint, the percentage width won't be applied, because the component is now wrapped in a full-width `<div />`.

### Passing Options

You can pass an object of options to the decorator to customize the waypoint. The `activatedProp` option allows you to change the name of the prop used to signal if the component has scrolled into view yet. The default prop name is `activated`.

The rest of the options are props to pass to the higher-order component&mdash;refer to the [props for the `<Waypoint />` component](#props) below.

```jsx
@waypoint({
  activatedProp: 'visible',
  offset: 25,
})
class Box extends Component {}
```

If you aren't using the decorator syntax, you'll call the `waypoint` function twice to pass options.

```jsx
waypoint({
  activatedProp: 'visible',
  offset: 25,
})(Box);
```

### Reusing Options

By default, the `waypoint` function/decorator takes a class and returns a new class. However, when you pass an options object, instead of returning a new class, it returns a new decorator function. If all your waypoints use the same settings, you can create one decorator to share between components.

```jsx
import React, { Component } from 'react';
import waypoint from 'react-waypoint-decorator';

const customWaypoint = waypoint({
  activatedProp: 'visible',
  offset: 25,
});

// As a decorator
@customWaypoint
class BoxOne extends Component {}

// As a function
const BoxTwo = customWaypoint(({ visible }) => <div />);
```

### Responding to Activation

To run specific code when a component scrolls into view, use `componentWillReceiveProps()`.

```jsx
@waypoint
class Box extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.activated && nextProps.activated) {
      // If we're here, then the component is scrolling into view for the first time
    }
  }
}
```

### Component Version

The decorator tracks the scroll position of the _entire_ component. If you only want to monitor a specific chunk of a component, we've got you covered.

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

### `waypoint(Child)`

Create a higher-order component that pairs the input component with a waypoint.

- **Child** (function or class): React component to wrap.

Returns a new React component.

### `waypoint(options)`

Create a waypoint decorator with custom settings.

- **options** (object): waypoint settings.
  - **activatedProp** (string): name of boolean prop to pass to wrapped component. Default is `activated`.
  - **offset** (number): percentage offset from the bottom of the window that triggers a waypoint. The default is `50`, which means the top edge of the component must be 50% of the way up the screen to trigger the waypoint. Higher numbers make components trigger later, while lower numbers make them trigger sooner.
  - **wrapper** (function): HTML to wrap the waypoint and component in. By default it's a `<div />`. To change this, pass a function to this object that takes one parameter, `children`, and returns JSX.

Returns a decorator function as described in the previous section.

### `<Waypoint />`

React component that wraps the output of a render function in a waypoint. The render function takes these parameters:

- **activated** (boolean): if the component has scrolled into view yet.

The `<Waypoint />` component takes these props:

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

MIT &copy; [Geoff Kimball](http://geoffkimball.com)

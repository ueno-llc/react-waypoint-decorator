import React from 'react';
import displayName from 'react-display-name';
import Waypoint from './waypoint';

export { Waypoint };

/**
 * Decorate a component to add an `activated` prop when it scrolls into view for the first time.
 * @param {object} options - Decorator options and default props for scroll trigger.
 * @returns {function} New higher order React component.
 */
export default (options) => {
  // Wraps the child component in a waypoint
  const wrap = (Child, { activatedProp = 'activated', ...opts }) => {
    // Final React component to be returned by the decorator
    const component = props => (
      <Waypoint {...opts}>
        {activated => (
          <Child
            {...{ [activatedProp]: activated }}
            {...props}
          />
        )}
      </Waypoint>
    );

    component.displayName = `waypoint(${displayName(Child)})`;
    return component;
  };

  // When written `@waypoint` (no function call)
  if (typeof options === 'function') {
    const Child = options;

    return wrap(Child, {});
  }

  // When written `@waypoint()` (function call)
  return Child => wrap(Child, options);
};

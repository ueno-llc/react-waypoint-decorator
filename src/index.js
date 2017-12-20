import React from 'react';
import Waypoint from './waypoint';
import getDisplayName from './get-display-name';
import filterProps from './filter-props';

/**
 * Decorate a component to add an `activated` prop when it scrolls into view for the first time.
 * @param {object} options - Decorator options and default props for scroll trigger.
 * @returns {function} New higher order React component.
 */
export default (options) => {
  // Wraps the child component in a scroll trigger
  const wrap = (Child, opts) => {
    // Creates the activated prop to add to `<Child />` below
    const activatedProp = activated => ({
      [opts.activatedProp || 'activated']: activated,
    });
    // Final React component to be returned by the decorator
    const wrapper = props => (
      <Waypoint {...filterProps(opts)}>
        {activated => <Child {...activatedProp(activated)} {...props} />}
      </Waypoint>
    );

    wrapper.displayName = getDisplayName(Child);
    return wrapper;
  };

  // When written `@scrollTrigger` (no function call)
  if (typeof options === 'function') {
    return wrap(options, {});
  }

  // When written `@scrollTrigger()` (function call)
  return Child => wrap(Child, options);
};

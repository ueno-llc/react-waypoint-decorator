/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import displayName from 'react-display-name';
import Waypoint from './waypoint';

export { Waypoint };

/**
 * Decorate a component to add an `activated` prop when it scrolls into view for the first time.
 * @param {object|function} [options] - Decorator options and default props for scroll trigger.
 * @returns {function} New higher order React component.
 */
export default (options = {}) => Child => class WithWaypoint extends Component {

  static displayName = `waypoint(${displayName(Child)})`

  render() {
    const derivedProps = typeof options === 'function';
    const {
      activatedProp = 'activated',
      ...waypointProps
    } = derivedProps ? options(this.props) : options;

    return (
      <Waypoint {...waypointProps}>
        {activated => (
          <Child
            {...{ [activatedProp]: activated }}
            {...this.props}
          />
        )}
      </Waypoint>
    );
  }
};

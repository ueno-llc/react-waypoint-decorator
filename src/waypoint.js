import React, { Fragment, PureComponent } from 'react';
import ReactWaypoint from 'react-waypoint';
import PropTypes from 'prop-types';

// When executed on the server, this value can be `undefined`
const win = typeof window !== 'undefined' ? window : undefined;

/**
 * Component that passes down an `activated` prop if the element has scrolled into view.
 */
export default class Waypoint extends PureComponent {

  /**
   * Prop types for `<ScrollTrigger />`.
   * @type object
   * @prop {function} children - Render function that receives one argument, `activated`.
   * @prop {number} [offset=50] - Percentage height of the screen that the top edge of the element
   must be positioned at to be activated.
   * @prop {function} wrapper - Function that creates the wrapping element to house the waypoint and
   the triggered element. By default, it's a plain `<div />`.
   */
  static propTypes = {
    children: PropTypes.func.isRequired,
    offset: PropTypes.number,
    wrapper: PropTypes.func,
  }

  static defaultProps = {
    offset: 50,
    wrapper: children => <div>{children}</div>,
  }

  /**
   * Internal state for `<ScrollTrigger />`.
   * @private
   * @type object
   * @prop {boolean} activated - If element has scrolled into view.
   */
  state = {
    activated: false,
  }

  /**
   * Respond to a change in the waypoint's position.
   * @param {object} e - Waypoint event object.
   */
  onPositionChange = (e) => {
    if (e.currentPosition === 'above') {
      this.setState({ activated: true });
    }
  }

  /**
   * Respond to the waypoint entering the visible browser area.
   * @param {object} e - Waypoint event object.
   */
  onEnter = (e) => {
    if (e.currentPosition === 'above') {
      this.setState({ activated: true });
    }
    if (!this.state.activated) {
      this.setState({ activated: true });
    }
  }

  render() {
    const { children, offset, wrapper } = this.props;
    const { activated } = this.state;

    return wrapper((
      <Fragment>
        <ReactWaypoint
          bottomOffset={`${offset}%`}
          scrollableAncestor={win}
          onEnter={this.onEnter}
          onPositionChange={this.onPositionChange}
          key="waypoint"
        />
        {children(activated)}
      </Fragment>
    ));
  }
}

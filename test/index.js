/* eslint-env mocha */
/* eslint-disable react/prop-types */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import ReactWaypoint from 'react-waypoint';
import waypoint, { Waypoint } from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('waypoint()', () => {
  let Component;

  before(() => {
    Component = ({ activated }) => <div className={String(activated)} />;
    Component.displayName = 'Thing';
  });

  it('returns a React component', () => {
    expect(waypoint(Component)).to.be.a('function');
  });

  it('includes the name of the component in the name of the wrapped component', () => {
    expect(waypoint(Component)).to.have.property('displayName', 'waypoint(Thing)');
  });

  it('passes props to the underlying <Waypoint /> component', () => {
    const WaypointComponent = waypoint(Component);
    const wrapper = mount(<WaypointComponent />);

    expect(wrapper.find(Component).prop('activated')).to.equal(false);
  });

  it('can override props on <Waypoint />', () => {
    const WaypointComponent = waypoint({
      offset: 25,
    })(Component);
    const wrapper = mount(<WaypointComponent />);

    expect(wrapper.find(Waypoint).prop('offset')).to.equal(25);
  });

  it('allows a custom activation prop to be set', () => {
    const WaypointComponent = waypoint({
      activatedProp: 'visible',
    })(Component);
    const wrapper = mount(<WaypointComponent />);

    expect(wrapper.find(Component).prop('visible')).to.equal(false);
  });

  it('allows an externally-applied `activated` prop to override the waypoint', () => {
    const WaypointComponent = waypoint(Component);
    const wrapper = mount(<WaypointComponent activated />);

    expect(wrapper.find(Component).prop('activated')).to.equal(true);
  });
});

describe('<Waypoint />', () => {
  let Component;

  before(() => {
    Component = () => (
      <Waypoint>
        {activated => <p>{String(activated)}</p>}
      </Waypoint>
    );
  });

  it('renders a wrapping <div>', () => {
    const wrapper = mount(<Component />);

    expect(wrapper.find('div').length).to.equal(1);
  });

  it('renders a waypoint', () => {
    const wrapper = mount(<Component />);

    expect(wrapper.find(ReactWaypoint).length).to.equal(1);
  });

  it('renders child content', () => {
    const wrapper = mount(<Component />);

    expect(wrapper.find('p').length).to.equal(1);
  });

  it('starts with activated = false', () => {
    const wrapper = mount(<Component />);

    expect(wrapper.find('p').text()).to.equal('false');
  });
});

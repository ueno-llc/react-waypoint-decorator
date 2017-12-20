/* eslint-env mocha */
/* eslint-disable react/prop-types */

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import waypoint, { Waypoint } from '.';

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
    expect(waypoint(Component)).to.have.property('displayName', 'Thing-withWaypoint');
  });

  it('passes props to the underlying <Waypoint /> component', () => {
    const WaypointComponent = waypoint(Component);
    const wrapper = mount(<WaypointComponent />);

    expect(wrapper.find(Component).prop('activated')).to.equal(false);
  });
});

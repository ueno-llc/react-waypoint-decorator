/* eslint-disable react/prop-types */

import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line
import waypoint from 'react-waypoint-decorator'; // eslint-disable-line

const Box = (props) => {
  const Component = waypoint(props)(({ activated }) => (
    <div className={`box ${activated ? 'activated' : ''}`} />
  ));

  return <Component {...props} />;
};

const App = () => (
  <div className="app">
    <div className="spacer" />
    <Box autoRun />
    <Box />
    <Box />
    <Box />
    <div className="spacer" />
  </div>
);

render(<App />, document.getElementById('app'));

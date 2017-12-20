/* eslint-disable react/prop-types */

import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line
import waypoint from 'react-waypoint-decorator'; // eslint-disable-line

const Box = waypoint(({ activated }) => (
  <div className={`box ${activated ? 'activated' : ''}`} />
));

const App = () => (
  <div className="app">
    <div className="spacer" />
    <Box />
    <Box />
    <Box />
    <Box />
    <div className="spacer" />
  </div>
);

render(<App />, document.getElementById('app'));

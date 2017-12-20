import Waypoint from './waypoint';

const filterProps = (obj) => {
  const output = {};

  Object.keys(obj).forEach((key) => {
    if (key in Waypoint.propTypes && key !== 'children') {
      output[key] = obj[key];
    }
  });

  return output;
};

export default filterProps;

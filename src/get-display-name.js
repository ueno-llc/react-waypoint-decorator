const getDisplayName = component =>
  `${(
    component.displayName
    || component.name
    || (component.constructor && component.constructor.name)
    || 'Unknown'
  )}-withWaypoint`;

export default getDisplayName;

import React from 'react';

const Computed = ({row,}) => {
  return (<input
  disabled={true}
  value={row.value}
  />);
};

export default Computed;

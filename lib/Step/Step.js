import React from 'react';

const Step = ({ children, render }) => {
  if (render) {
    return render;
  }

  return children;
};

export default Step;

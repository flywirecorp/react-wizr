import React from 'react';

const Step = ({ children, className, render }) => {
  if (render) {
    return render;
  }

  return <div className={className}>{children}</div>;
};

export default Step;

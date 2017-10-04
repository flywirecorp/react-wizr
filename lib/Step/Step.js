import React from 'react';

const Step = ({ children, className, render }) => (
  <div className={className}>{render ? render : children}</div>
);

export default Step;

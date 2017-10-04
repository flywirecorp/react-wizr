import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ children, className, render }, { activeStepIndex }) => {
  const currentStep = React.Children.toArray(children)[activeStepIndex];

  if (render) {
    return currentStep;
  }

  return <div className={className}>{currentStep}</div>;
};

Steps.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired
};

export default Steps;

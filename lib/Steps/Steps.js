import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ children, className }, { activeStepIndex }) => {
  const currentStep = React.Children.toArray(children)[activeStepIndex];

  return <div className={className}>{currentStep}</div>;
};

Steps.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired
};

export default Steps;

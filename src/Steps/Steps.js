import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ children }, { activeStepIndex }) => {
  const currentStep = React.Children.toArray(children)[activeStepIndex];

  return currentStep;
};

Steps.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired
};

export default Steps;

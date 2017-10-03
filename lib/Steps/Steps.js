import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ children, ...rest }, { activeStepIndex }) => {
  const currentStep = React.Children.toArray(children)[activeStepIndex];

  return <div {...rest}>{currentStep}</div>;
};

Steps.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired
};

export default Steps;

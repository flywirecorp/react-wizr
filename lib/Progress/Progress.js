import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ children, render }, { activeStepIndex, totalSteps }) => {
  const percentage = (activeStepIndex + 1) * 100 / totalSteps;

  return render ? render({ percentage }) : children({ percentage });
};

PropTypes.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
};

export default Progress;

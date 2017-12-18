import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ children, render }, context) => {
  if (render) {
    return render(context);
  }

  return children;
};

Navigation.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  totalSteps: PropTypes.number.isRequired
};

export default Navigation;

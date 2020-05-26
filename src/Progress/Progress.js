import React from 'react';
import PropTypes from 'prop-types';
import WizardContext from '../context';

const Progress = ({ children, render }) => (
  <WizardContext.Consumer>
    {({ activeStepIndex, totalSteps }) => {
      const percentage = ((activeStepIndex + 1) * 100) / totalSteps;

      if (render) {
        return render({ percentage });
      }

      return typeof children === 'function' ? children(percentage) : children;
    }}
  </WizardContext.Consumer>
);

Progress.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  render: PropTypes.func,
};

export default Progress;

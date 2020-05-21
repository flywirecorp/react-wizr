import React, { Children } from 'react';
import PropTypes from 'prop-types';
import WizardContext from '../context';

const Steps = ({ children }) => (
  <WizardContext.Consumer>
    {({ activeStepIndex }) => Children.toArray(children)[activeStepIndex]}
  </WizardContext.Consumer>
);

Steps.propTypes = {
  children: PropTypes.node.isRequired,
};

Steps.defaultProps = {
  isSteps: true,
};

export default Steps;

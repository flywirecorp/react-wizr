import React from 'react';
import PropTypes from 'prop-types';
import WizardContext from '../context';

const Navigation = ({ children, render }) => (
  <WizardContext.Consumer>
    {context => {
      if (render) {
        return render(context);
      }

      return typeof children === 'function' ? children(context) : children;
    }}
  </WizardContext.Consumer>
);

Navigation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  render: PropTypes.func,
};

export default Navigation;

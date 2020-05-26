import PropTypes from 'prop-types';

const Step = ({ children, render }) => (render ? render : children);

Step.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
};

Step.defaultProps = {
  isStep: true,
};

export default Step;

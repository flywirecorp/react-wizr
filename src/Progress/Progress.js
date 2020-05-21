import PropTypes from 'prop-types';

const Progress = ({ children, render }, { activeStepIndex, totalSteps }) => {
  const percentage = ((activeStepIndex + 1) * 100) / totalSteps;

  if (render) {
    return render({ percentage });
  }

  return children({ percentage });
};

Progress.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default Progress;

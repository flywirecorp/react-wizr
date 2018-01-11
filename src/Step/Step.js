const Step = ({ children, render }) => {
  if (render) {
    return render;
  }

  return children;
};

Step.defaultProps = {
  isStep: true
};

export default Step;

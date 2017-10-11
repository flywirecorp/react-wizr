import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wizard extends Component {
  static childContextTypes = {
    activeStepIndex: PropTypes.number.isRequired,
    goToNextStep: PropTypes.func.isRequired,
    goToPrevStep: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    totalSteps: PropTypes.number.isRequired
  };

  static propTypes = {
    defaultActiveStepIndex: PropTypes.number,
    onStepChanged: PropTypes.func
  };

  static defaultProps = {
    defaultActiveStepIndex: 0,
    onStepChanged: () => {}
  };

  firstStep = 0;

  state = {
    activeStepIndex: this.props.defaultActiveStepIndex
  };

  getChildContext() {
    const { activeStepIndex, totalSteps } = this.state;
    return {
      activeStepIndex,
      goToNextStep: this.goToNextStep,
      goToPrevStep: this.goToPrevStep,
      goToStep: this.goToStep,
      totalSteps
    };
  }

  componentWillMount() {
    this.initWizard();
  }

  initWizard() {
    let totalSteps = 0;

    React.Children.forEach(this.props.children, child => {
      if (child.type.name === 'Steps') {
        totalSteps = React.Children.count(child.props.children);
      }
    });

    this.setState({ totalSteps });
  }

  goToPrevStep = () => {
    const { activeStepIndex } = this.state;

    this.goToStep(activeStepIndex - 1);
  };

  goToNextStep = () => {
    const { activeStepIndex } = this.state;

    this.goToStep(activeStepIndex + 1);
  };

  goToStep = index => {
    const { totalSteps } = this.state;
    if (index < this.firstStep || index > totalSteps - 1) {
      return;
    }

    this.setState(
      () => {
        return { activeStepIndex: index };
      },
      () =>
        this.props.onStepChanged({
          activeStepIndex: this.state.activeStepIndex
        })
    );
  };

  render() {
    const { children, className, render } = this.props;

    if (render) {
      return render;
    }

    return <div className={className}>{children}</div>;
  }
}

export default Wizard;

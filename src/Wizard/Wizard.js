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
    activeStepIndex: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    defaultActiveStepIndex: PropTypes.number,
    onStepChanged: PropTypes.func,
    render: PropTypes.func
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
    const { totalSteps } = this.state;
    const activeStepIndex = this.getActiveStepIndex();

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

  getActiveStepIndex() {
    return this.isUncontrolled()
      ? this.state.activeStepIndex
      : this.props.activeStepIndex;
  }

  goToPrevStep = () => {
    const activeStepIndex = this.getActiveStepIndex();

    this.goToStep(activeStepIndex - 1);
  };

  goToNextStep = () => {
    const activeStepIndex = this.getActiveStepIndex();

    this.goToStep(activeStepIndex + 1);
  };

  goToStep = index => {
    const { totalSteps } = this.state;

    if (index < this.firstStep || index > totalSteps - 1) {
      return;
    }

    if (this.isUncontrolled()) {
      this.setState({ activeStepIndex: index });
    }

    this.props.onStepChanged({
      activeStepIndex: index
    });
  };

  isUncontrolled() {
    return typeof this.props.activeStepIndex === 'undefined';
  }

  render() {
    const { children, render } = this.props;

    if (render) {
      return render;
    }

    return children;
  }
}

export default Wizard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wizard extends Component {
  static childContextTypes = {
    activeStepIndex: PropTypes.number.isRequired,
    goToNextStep: PropTypes.func.isRequired,
    goToPrevStep: PropTypes.func.isRequired,
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

  state = {
    activeStepIndex: this.props.defaultActiveStepIndex
  };

  getChildContext() {
    const { activeStepIndex, totalSteps } = this.state;
    return {
      activeStepIndex,
      goToNextStep: this.goToNextStep,
      goToPrevStep: this.goToPrevStep,
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
    this.setState(
      prevState => {
        return { activeStepIndex: prevState.activeStepIndex - 1 };
      },
      () =>
        this.props.onStepChanged({
          activeStepIndex: this.state.activeStepIndex
        })
    );
  };

  goToNextStep = () => {
    this.setState(
      prevState => {
        return { activeStepIndex: prevState.activeStepIndex + 1 };
      },
      () =>
        this.props.onStepChanged({
          activeStepIndex: this.state.activeStepIndex
        })
    );
  };

  render() {
    const { children, className, render } = this.props;

    return <div className={className}>{render ? render : children}</div>;
  }
}

export default Wizard;

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
    onStepChanged: PropTypes.func
  };

  static defaultProps = {
    onStepChanged: () => {}
  };

  state = {
    activeStepIndex: 0
  };

  getChildContext() {
    const { activeStepIndex, totalSteps } = this.state;
    return {
      activeStepIndex: activeStepIndex,
      goToNextStep: this.goToNextStep,
      goToPrevStep: this.goToPrevStep,
      totalSteps: totalSteps
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
      () => this.props.onStepChanged(this.state)
    );
  };

  goToNextStep = () => {
    this.setState(
      prevState => {
        return { activeStepIndex: prevState.activeStepIndex + 1 };
      },
      () => this.props.onStepChanged(this.state)
    );
  };

  render() {
    const { children, className } = this.props;

    return <div className={className}>{children}</div>;
  }
}

export default Wizard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';

class Wizard extends Component {
  static childContextTypes = {
    activeStepIndex: PropTypes.number.isRequired,
    goToNextStep: PropTypes.func.isRequired,
    goToPrevStep: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    totalSteps: PropTypes.number.isRequired
  };

  static propTypes = {
    activeStepIndex: PropTypes.number,
    baseUrl: PropTypes.string,
    children: PropTypes.node.isRequired,
    history: PropTypes.object,
    defaultActiveStepIndex: PropTypes.number,
    onStepChanged: PropTypes.func,
    render: PropTypes.func
  };

  static defaultProps = {
    defaultActiveStepIndex: 0,
    history: createMemoryHistory(),
    onStepChanged: () => {}
  };

  firstStep = 0;

  state = {
    activeStepIndex: this.props.defaultActiveStepIndex
  };

  componentWillMount() {
    this.initWizard();
  }

  componentDidMount() {
    const { baseUrl, history } = this.props;
    const { steps } = this.state;

    this.unlisten = history.listen(({ pathname }, action) => {
      if (action === 'PUSH') return;
      const id = pathname.replace(`${baseUrl}/`, '');
      const stepIndex = steps.findIndex(step => step.id === id);
      this.setState({ activeStepIndex: stepIndex });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

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

  initWizard() {
    const activeStepIndex = this.getActiveStepIndex();
    const steps = [];

    React.Children.forEach(this.props.children, child => {
      if (child.type.name === 'Steps') {
        React.Children.map(child.props.children, ({ props: { id } }) =>
          steps.push({ id })
        );
      }
    });

    this.setState({ steps, totalSteps: steps.length });

    const { id } = steps[activeStepIndex];
    this.push(id);
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
    const { baseUrl, history, onStepChanged } = this.props;
    const { totalSteps, steps } = this.state;
    const outOfRange = index < this.firstStep || index > totalSteps - 1;
    const isUncontrolled = this.isUncontrolled();

    if (outOfRange) return;
    if (isUncontrolled) {
      this.setState({ activeStepIndex: index });
    }

    const { id } = steps[index];
    this.push(id);

    onStepChanged({ activeStepIndex: index });
  };

  isUncontrolled() {
    return typeof this.props.activeStepIndex === 'undefined';
  }

  push(path) {
    const { history } = this.props;
    history.push(`${this.props.baseUrl}/${path}`);
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

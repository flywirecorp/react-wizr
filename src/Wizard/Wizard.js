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
    defaultActiveStepIndex: PropTypes.number,
    history: PropTypes.object,
    onStepChanged: PropTypes.func,
    render: PropTypes.func
  };

  static defaultProps = {
    defaultActiveStepIndex: 0,
    history: createMemoryHistory(),
    onStepChanged: () => {}
  };

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

  componentDidMount() {
    const { baseUrl, history } = this.props;
    const { steps } = this.state;

    this.unlisten = history.listen(({ pathname }, action) => {
      if (action === 'PUSH') return;
      const path = pathname.replace(`${baseUrl}/`, '');
      const stepIndex = steps.findIndex(step => step.id === path);
      this.setActiveStepIndex(stepIndex);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  firstStep = 0;

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
    const { totalSteps, steps } = this.state;
    const outOfRange = index < this.firstStep || index > totalSteps - 1;

    if (outOfRange) return;
    this.setActiveStepIndex(index);

    const path = steps[index].id;
    this.push(path);
  };

  isUncontrolled() {
    return typeof this.props.activeStepIndex === 'undefined';
  }

  push(path) {
    const { history } = this.props;
    history.push(`${this.props.baseUrl}/${path}`);
  }

  setActiveStepIndex(index) {
    const { onStepChanged } = this.props;
    const isUncontrolled = this.isUncontrolled();

    if (isUncontrolled) {
      this.setState({ activeStepIndex: index });
    }

    onStepChanged({ activeStepIndex: index });
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

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';
import WizardContext from '../context';

const FIRST_STEP = 0;

class Wizard extends Component {
  constructor(props) {
    super(props);

    const steps = this.steps;
    this.state = {
      activeStepIndex: this.props.defaultActiveStepIndex,
      steps,
      totalSteps: steps.length,
    };

    if (steps.length > 0) {
      const { id } = steps[this.props.defaultActiveStepIndex];
      this.replaceHistory(id);
    }

    this.goToPrevStep = this.goToPrevStep.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.goToStep = this.goToStep.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      const steps = this.steps;
      this.setState({ steps, totalSteps: steps.length });
    }
  }

  componentDidMount() {
    const { baseUrl, history } = this.props;
    const { steps } = this.state;

    this.unlisten = history.listen(({ pathname }, action) => {
      const noBrowserNavigationKeysPressed = action !== 'POP';
      if (noBrowserNavigationKeysPressed) return;

      const path = pathname.replace(`${baseUrl}/`, '');
      const stepIndex = steps.findIndex(step => step.id === path);
      this.setActiveStepIndex(stepIndex);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  get steps() {
    const { children } = this.props;
    const steps = [];

    Children.forEach(children, child => {
      if (child && child.props.isSteps) {
        const {
          props: { children: grandchildren },
        } = child;

        Children.forEach(grandchildren, child => {
          if (child && child.props.isStep) {
            const {
              props: { id },
            } = child;
            steps.push({ id });
          }
        });
      }
    });

    return steps;
  }

  get activeStepIndex() {
    return this.isUncontrolled
      ? this.state.activeStepIndex
      : this.props.activeStepIndex;
  }

  goToPrevStep() {
    const activeStepIndex = this.activeStepIndex;
    this.goToStep(activeStepIndex - 1);
  }

  goToNextStep() {
    const activeStepIndex = this.activeStepIndex;
    this.goToStep(activeStepIndex + 1);
  }

  goToStep(index) {
    const { totalSteps, steps } = this.state;
    const { onWizardFinished } = this.props;
    const lastStep = index < FIRST_STEP || index > totalSteps - 1;

    if (lastStep) return onWizardFinished();
    this.setActiveStepIndex(index);

    const path = steps[index].id;
    this.pushHistory(path);
  }

  get isUncontrolled() {
    const { activeStepIndex } = this.props;
    return typeof activeStepIndex === 'undefined';
  }

  pushHistory(path) {
    const { baseUrl, history } = this.props;
    history.push(`${baseUrl}/${path}`);
  }

  replaceHistory(path) {
    const { baseUrl, history } = this.props;
    history.replace(`${baseUrl}/${path}`);
  }

  setActiveStepIndex(index) {
    const { onStepChanged } = this.props;
    const { steps } = this.state;

    if (this.isUncontrolled) {
      this.setState({ activeStepIndex: index });
    }

    onStepChanged({
      activeStepIndex: index,
      step: steps[index],
    });
  }

  render() {
    const { children, render } = this.props;
    const { totalSteps } = this.state;
    const context = {
      activeStepIndex: this.activeStepIndex,
      goToNextStep: this.goToNextStep,
      goToPrevStep: this.goToPrevStep,
      goToStep: this.goToStep,
      totalSteps,
    };

    return (
      <WizardContext.Provider value={context}>
        {render ? render : children}
      </WizardContext.Provider>
    );
  }
}

Wizard.propTypes = {
  activeStepIndex: PropTypes.number,
  baseUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  defaultActiveStepIndex: PropTypes.number,
  history: PropTypes.object,
  onStepChanged: PropTypes.func,
  onWizardFinished: PropTypes.func,
  render: PropTypes.func,
};

Wizard.defaultProps = {
  defaultActiveStepIndex: 0,
  history: createMemoryHistory(),
  onStepChanged: () => {},
  onWizardFinished: () => {},
};

export default Wizard;

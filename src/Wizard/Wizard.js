import { Component, Children } from 'react';
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
    const activeStepIndex = this.activeStepIndex;

    return {
      activeStepIndex,
      goToNextStep: this.goToNextStep,
      goToPrevStep: this.goToPrevStep,
      goToStep: this.goToStep,
      totalSteps
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.children !== this.props.children) {
      this.setSteps();
    }
  }

  UNSAFE_componentWillMount() {
    this.initWizard();
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

  firstStep = 0;

  initWizard() {
    const activeStepIndex = this.activeStepIndex;
    const steps = this.setSteps();
    if (steps.length === 0) return;

    const { id } = steps[activeStepIndex];
    this.replace(id);
  }

  setSteps() {
    const { children } = this.props;
    const steps = [];

    Children.forEach(children, child => {
      if (child && child.props.isSteps) {
        const {
          props: { children: grandchildren }
        } = child;

        Children.forEach(grandchildren, child => {
          if (child && child.props.isStep) {
            const {
              props: { id }
            } = child;
            steps.push({ id });
          }
        });
      }
    });

    this.setState({ steps, totalSteps: steps.length });

    return steps;
  }

  get activeStepIndex() {
    return this.isUncontrolled()
      ? this.state.activeStepIndex
      : this.props.activeStepIndex;
  }

  goToPrevStep = () => {
    const activeStepIndex = this.activeStepIndex;

    this.goToStep(activeStepIndex - 1);
  };

  goToNextStep = () => {
    const activeStepIndex = this.activeStepIndex;

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
    const { activeStepIndex } = this.props;
    return typeof activeStepIndex === 'undefined';
  }

  push(path) {
    const { baseUrl, history } = this.props;
    history.push(`${baseUrl}/${path}`);
  }

  replace(path) {
    const { baseUrl, history } = this.props;
    history.replace(`${baseUrl}/${path}`);
  }

  setActiveStepIndex(index) {
    const { onStepChanged } = this.props;
    const { steps } = this.state;
    const isUncontrolled = this.isUncontrolled();

    if (isUncontrolled) {
      this.setState({ activeStepIndex: index });
    }

    onStepChanged({
      activeStepIndex: index,
      step: steps[index]
    });
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

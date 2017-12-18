import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Wizard from './Wizard';

const Steps = ({ children }) => children;
const Step = ({ children }, context) => {
  if (typeof children === 'function') {
    return children(context);
  }
  return children;
};

Step.contextTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  totalSteps: PropTypes.number.isRequired
};

describe('Wizard', () => {
  describe('with no props', () => {
    let wrapper;
    let activeStepIndex;
    let goToNextStep;
    let goToPrevStep;
    let goToStep;
    let totalSteps;
    let onStepChanged = jest.fn();

    beforeEach(() => {
      wrapper = mount(
        <Wizard onStepChanged={onStepChanged}>
          <Steps>
            <Step>
              {({
                activeStepIndex: wizardActiveStepIndex,
                goToNextStep: wizardGoToNextStep,
                goToPrevStep: wizardGoToPrevStep,
                goToStep: wizardGoToStep,
                totalSteps: wizardTotalSteps
              }) => {
                activeStepIndex = wizardActiveStepIndex;
                goToNextStep = wizardGoToNextStep;
                goToPrevStep = wizardGoToPrevStep;
                goToStep = wizardGoToStep;
                totalSteps = wizardTotalSteps;

                return 1;
              }}
            </Step>
            <Step>2</Step>
          </Steps>
        </Wizard>
      );
    });

    const firstStep = 0;
    const secondStep = 1;
    const lastStep = secondStep;
    const goToLastStep = () => goToStep(lastStep);

    afterEach(function() {
      onStepChanged.mockReset();
    });

    it('renders its children', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('returns the number of steps', () => {
      expect(totalSteps).toBe(2);
    });

    it('starts at first step', () => {
      expect(activeStepIndex).toBe(firstStep);
    });

    it('moves to given step', () => {
      goToStep(firstStep);

      expect(activeStepIndex).toBe(firstStep);
    });

    it('moves to next step', () => {
      goToStep(firstStep);
      goToNextStep();

      expect(activeStepIndex).toBe(secondStep);
    });

    it('does not move to next step when in the last step', () => {
      goToLastStep();
      goToNextStep();

      expect(activeStepIndex).toBe(lastStep);
    });

    it('moves back to prev step', () => {
      goToStep(secondStep);
      goToPrevStep();

      expect(activeStepIndex).toBe(firstStep);
    });

    it('does not move to prev step when in the first step', () => {
      goToStep(firstStep);
      goToPrevStep();

      expect(activeStepIndex).toBe(firstStep);
    });

    it('executes a callback when moving through steps', () => {
      goToNextStep();

      expect(onStepChanged).toBeCalledWith({
        activeStepIndex: 1
      });
    });
  });

  describe('passing defaultActiveStepIndex prop', () => {
    it('starts at given step', () => {
      let activeStepIndex;
      const wrapper = mount(
        <Wizard defaultActiveStepIndex={1}>
          <Steps>
            <Step>
              {({ activeStepIndex: wizardActiveStepIndex }) => {
                activeStepIndex = wizardActiveStepIndex;
                return null;
              }}
            </Step>
          </Steps>
        </Wizard>
      );

      expect(activeStepIndex).toBe(1);
    });
  });

  describe('passing activeStepIndex prop', () => {
    it('keeps the state in the component rendering the wizard,', () => {
      class ControlledWizard extends React.Component {
        state = {
          activeStepIndex: 0
        };

        render() {
          return (
            <Wizard
              activeStepIndex={this.state.activeStepIndex}
              onStepChanged={({ activeStepIndex }) =>
                this.setState({ activeStepIndex })}
            >
              <Steps>
                <Step>
                  {({ goToNextStep }) => {
                    return (
                      <button onClick={goToNextStep}>Go to next step</button>
                    );
                  }}
                </Step>
                <Step>2</Step>
              </Steps>
            </Wizard>
          );
        }
      }

      const wrapper = mount(<ControlledWizard />);
      wrapper.find('button').simulate('click');

      expect(wrapper.state().activeStepIndex).toBe(1);
    });
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Wizard from './Wizard';

const Steps = ({ children }) => children;
const Step = ({ children }, context) => children(context);
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

                return null;
              }}
            </Step>
          </Steps>
        </Wizard>
      );
    });

    afterEach(function() {
      onStepChanged.mockReset();
    });

    it('renders its children', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('starts at first step', () => {
      expect(activeStepIndex).toBe(0);
    });

    it('moves to next step', () => {
      goToNextStep();

      expect(activeStepIndex).toBe(1);
    });

    it('moves to prev step', () => {
      goToPrevStep();

      expect(activeStepIndex).toBe(-1);
    });

    it('moves to given step', () => {
      goToStep(2);

      expect(activeStepIndex).toBe(2);
    });

    it('executes a callback when moving through steps', () => {
      goToNextStep();

      expect(onStepChanged).toBeCalledWith({
        activeStepIndex: 1
      });
    });

    it('returns the number of steps', () => {
      expect(totalSteps).toBe(1);
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
});

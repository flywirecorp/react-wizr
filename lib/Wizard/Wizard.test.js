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
  totalSteps: PropTypes.number.isRequired
};

describe('Wizard', () => {
  let wrapper;
  let activeStepIndex;
  let goToNextStep;
  let goToPrevStep;
  let totalSteps;

  beforeEach(() => {
    wrapper = mount(
      <Wizard>
        <Steps>
          <Step>
            {({
              activeStepIndex: wizardActiveStepIndex,
              goToNextStep: wizardGoToNextStep,
              goToPrevStep: wizardGoToPrevStep,
              totalSteps: wizardTotalSteps
            }) => {
              activeStepIndex = wizardActiveStepIndex;
              goToNextStep = wizardGoToNextStep;
              goToPrevStep = wizardGoToPrevStep;
              totalSteps = wizardTotalSteps;

              return null;
            }}
          </Step>
        </Steps>
      </Wizard>
    );
  });

  it('renders its children', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('starts on first step', () => {
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

  it('returns the number of steps', () => {
    expect(totalSteps).toBe(1);
  });
});

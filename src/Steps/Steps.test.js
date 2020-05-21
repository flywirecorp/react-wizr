import React from 'react';
import { mount } from 'enzyme';
import Steps from './Steps';
import WizardContext from '../context';

describe('Steps', () => {
  it('renders the active step', () => {
    const FirstStep = () => null;
    const SecondStep = () => null;
    const activeStepIndex = 1;

    const wrapper = mount(
      <WizardContext.Provider value={{ activeStepIndex }}>
        <Steps>
          <FirstStep />
          <SecondStep />
        </Steps>
      </WizardContext.Provider>,
    );

    expect(wrapper.contains(<FirstStep />)).toBe(false);
    expect(wrapper.contains(<SecondStep />)).toBe(true);
  });
});

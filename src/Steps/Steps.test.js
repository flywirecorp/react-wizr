import React from 'react';
import { shallow } from 'enzyme';
import Steps from './Steps';

describe('Steps', () => {
  it('renders the active step', () => {
    const FirstStep = () => null;
    const SecondStep = () => null;
    const context = { activeStepIndex: 1 };
    const wrapper = shallow(
      <Steps>
        <FirstStep />
        <SecondStep />
      </Steps>,
      { context }
    );

    expect(wrapper.contains(<FirstStep />)).toBe(false);
    expect(wrapper.contains(<SecondStep />)).toBe(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Steps from './Steps';

describe('Steps', () => {
  it('renders the correct child', () => {
    const Step = () => <div />;
    const context = { activeStepIndex: 1 };
    const wrapper = shallow(
      <Steps>
        <Step />
        <Step />
      </Steps>,
      { context }
    );

    expect(wrapper).toMatchSnapshot();
  });
});

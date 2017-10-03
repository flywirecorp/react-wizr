import React from 'react';
import { shallow } from 'enzyme';
import Step from './Step';

describe('Step', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <Step>
        <div />
      </Step>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Step from './Step';

describe('Step', () => {
  it('renders its children', () => {
    const Children = () => null;
    const wrapper = shallow(
      <Step>
        <Children />
      </Step>
    );

    expect(wrapper.contains(<Children />)).toBe(true);
  });
});

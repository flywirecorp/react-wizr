import React from 'react';
import { shallow } from 'enzyme';
import Progress from './Progress';

describe('Progress', () => {
  it('returns the completion percentage', () => {
    let p = null;
    const context = { activeStepIndex: 1, totalSteps: 2 };
    const wrapper = shallow(
      <Progress
        render={({ percentage }) => {
          p = percentage;
        }}
      />,
      { context }
    );

    expect(p).toEqual(100);
  });
});

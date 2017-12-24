import React from 'react';
import { shallow } from 'enzyme';
import Progress from './Progress';

describe('Progress', () => {
  it('returns the completion percentage', () => {
    let percentage = null;
    const context = { activeStepIndex: 1, totalSteps: 2 };
    shallow(
      <Progress
        render={({ percentage: p }) => {
          percentage = p;
        }}
      />,
      { context }
    );

    expect(percentage).toEqual(100);
  });
});

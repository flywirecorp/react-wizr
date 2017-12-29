import React from 'react';
import { shallow } from 'enzyme';
import Progress from './Progress';

describe('Progress', () => {
  it('returns the completion percentage', () => {
    let percentage = null;
    const context = { activeStepIndex: 0, totalSteps: 4 };
    shallow(
      <Progress
        render={({ percentage: p }) => {
          percentage = p;
        }}
      />,
      { context }
    );

    expect(percentage).toEqual(25);
  });

  it('returns the completion percentage', () => {
    let percentage = null;
    const context = { activeStepIndex: 1, totalSteps: 4 };
    shallow(
      <Progress
        render={({ percentage: p }) => {
          percentage = p;
        }}
      />,
      { context }
    );

    expect(percentage).toEqual(50);
  });

  it('returns the completion percentage', () => {
    let percentage = null;
    const context = { activeStepIndex: 2, totalSteps: 4 };
    shallow(
      <Progress
        render={({ percentage: p }) => {
          percentage = p;
        }}
      />,
      { context }
    );

    expect(percentage).toEqual(75);
  });

  it('returns the completion percentage', () => {
    let percentage = null;
    const context = { activeStepIndex: 3, totalSteps: 4 };
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

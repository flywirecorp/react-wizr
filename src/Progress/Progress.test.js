import React from 'react';
import { mount } from 'enzyme';
import Progress from './Progress';
import WizardContext from '../context';

describe('Progress', () => {
  it('returns the completion percentage', () => {
    let percentage = null;

    mount(
      <WizardContext.Provider
        value={{
          activeStepIndex: 0,
          totalSteps: 4,
        }}
      >
        <Progress
          render={({ percentage: p }) => {
            percentage = p;
            return null;
          }}
        />
      </WizardContext.Provider>,
    );

    expect(percentage).toEqual(25);
  });

  it('returns the completion percentage', () => {
    let percentage = null;

    mount(
      <WizardContext.Provider
        value={{
          activeStepIndex: 1,
          totalSteps: 4,
        }}
      >
        <Progress
          render={({ percentage: p }) => {
            percentage = p;
            return null;
          }}
        />
      </WizardContext.Provider>,
    );

    expect(percentage).toEqual(50);
  });

  it('returns the completion percentage', () => {
    let percentage = null;

    mount(
      <WizardContext.Provider
        value={{
          activeStepIndex: 2,
          totalSteps: 4,
        }}
      >
        <Progress
          render={({ percentage: p }) => {
            percentage = p;
            return null;
          }}
        />
      </WizardContext.Provider>,
    );

    expect(percentage).toEqual(75);
  });

  it('returns the completion percentage', () => {
    let percentage = null;

    mount(
      <WizardContext.Provider
        value={{
          activeStepIndex: 3,
          totalSteps: 4,
        }}
      >
        <Progress
          render={({ percentage: p }) => {
            percentage = p;
            return null;
          }}
        />
      </WizardContext.Provider>,
    );

    expect(percentage).toEqual(100);
  });
});

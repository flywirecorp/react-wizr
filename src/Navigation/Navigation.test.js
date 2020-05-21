import React from 'react';
import { mount } from 'enzyme';
import Navigation from './Navigation';
import WizardContext from '../context';

describe('Navigation', () => {
  it('renders its children', () => {
    const Children = () => null;
    const wrapper = mount(
      <WizardContext.Provider value={{}}>
        <Navigation>
          <Children />
        </Navigation>
      </WizardContext.Provider>,
    );

    expect(wrapper.contains(<Children />)).toBe(true);
  });

  it('exposes navigation context as props', () => {
    const context = {
      activeStepIndex: 0,
      goToNextStep: jest.fn(),
      goToPrevStep: jest.fn(),
      goToStep: jest.fn(),
      totalSteps: 2,
    };

    let navigationProps;

    mount(
      <WizardContext.Provider value={context}>
        <Navigation
          render={props => {
            navigationProps = props;
            return null;
          }}
        />
      </WizardContext.Provider>,
    );

    expect(navigationProps).toEqual(context);
  });
});

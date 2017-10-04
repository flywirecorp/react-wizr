import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders children', () => {
    const Children = () => null;
    const wrapper = shallow(
      <Navigation>
        <Children />
      </Navigation>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('exposes navigation context as props', () => {
    const context = {
      activeStepIndex: 0,
      goToNextStep: jest.fn(),
      goToPrevStep: jest.fn(),
      goToStep: jest.fn(),
      totalSteps: 2
    };

    let navigationProps;

    shallow(
      <Navigation
        render={props => {
          navigationProps = props;
        }}
      />,
      {
        context
      }
    );

    expect(navigationProps).toEqual(context);
  });
});

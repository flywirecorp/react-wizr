# react-wizr

React library for building declarative wizards

## Example

### Uncontrolled component

```
const WizardPage = () => (
  <div className="WizardPage">
    <Wizard
      onStepChanged={({ activeStepIndex }) =>
        console.log(`Step changed: ${activeStepIndex}`)
      }
    >
      <Steps>
        <Step>
          <Navigation
            render={({ goToNextStep }) => {
              return <CountrySelectionStep onSelected={goToNextStep} />;
            }}
          />
        </Step>
        <Step>
          <CustomerInformationStep />
        </Step>
        <Step>
          <Navigation
            render={({ goToNextStep }) => {
              return <PaymentMethodSelectionStep onSelected={goToNextStep} />;
            }}
          />
        </Step>
      </Steps>
    </Wizard>
  </div>
)
```

[![Example 0xv49oqn0n](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0xv49oqn0n)

### Controlled component

```
class App extends Component {
  state = {
    activeStepIndex: 0
  };

  render() {
    return (
      <Wizard activeStepIndex={this.state.activeStepIndex}>
        <Steps>
          <Step>
            <button onClick={() => this.setState({ activeStepIndex: 1 })}>
              Go next step
            </button>
          </Step>
          <Step>
            <button onClick={() => this.setState({ activeStepIndex: 0 })}>
              Go prev step
            </button>
          </Step>
        </Steps>
      </Wizard>
    );
  }
}
```

## Built With

* [React](https://reactjs.org)
* [ReactDOM](https://reactjs.org/docs/react-dom.html)

## Authors

* **Vicent Gozalbes** - *Initial work* - [vigosan](https://github.com/vigosan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

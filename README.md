# react-wizr

React library for building declarative wizards

## Example

### Uncontrolled component

```
const App = () => (
  <Wizard
    onStepChanged={({ activeStepIndex }) =>
      console.log(`Step changed: ${activeStepIndex}`)
    }
  >
    <Steps>
      <Step id="country">
        <Navigation
          render={({ goToNextStep }) => {
            return <CountrySelectionStep onSelected={goToNextStep} />;
          }}
        />
      </Step>
      <Step id="customer">
        <CustomerInformationStep />
      </Step>
      <Step id="offer">
        <Navigation
          render={({ goToNextStep }) => {
            return <PaymentMethodSelectionStep onSelected={goToNextStep} />;
          }}
        />
      </Step>
    </Steps>
  </Wizard>
)
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0xv49oqn0n)

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
          <Step id="first">
            <button onClick={() => this.setState({ activeStepIndex: 1 })}>
              Go next step
            </button>
          </Step>
          <Step id="second">
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

### Routed

```
class App extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/steps"
          render={({ history, match: { url } }) => (
            <Wizard history={history} baseUrl={url}>
              <Steps>
                <Step id="one">
                  <h1>Step 1</h1>
                  <Navigation
                    render={({ goToNextStep }) => {
                      return (
                        <button onClick={goToNextStep}>Go To Step 2</button>
                      );
                    }}
                  />
                </Step>
                <Step id="two">
                  <h1>Step 2</h1>
                  <Navigation
                    render={({, goToPrevStep }) => {
                      return (
                        <button onClick={goToPrevStep}>Go To Step 1</button>
                      );
                    }}
                  />
                </Step>
              </Steps>
            </Wizard>
          )}
        />
      </Router>
    );
  }
}
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l2jmypvp1m)

## Built With

* [React](https://reactjs.org)
* [ReactDOM](https://reactjs.org/docs/react-dom.html)

## Authors

* **Vicent Gozalbes** - *Initial work* - [vigosan](https://github.com/vigosan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

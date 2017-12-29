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
      <Step id="first">
        <section>
          Minions ipsum tulaliloo la bodaaa tatata bala tu la bodaaa. Aaaaaah
          para tú aaaaaah hahaha ti aamoo! Bappleees belloo! Tatata bala tu
          bappleees. Uuuhhh para tú underweaaar poopayee hahaha chasy me want
          bananaaa! Potatoooo ti aamoo! Baboiii.
        </section>
      </Step>
      <Step id="second">
        <section>
          Belloo! tatata bala tu chasy poopayee ti aamoo! Para tú bee do bee do
          bee do belloo! Tatata bala tu hahaha bappleees me want bananaaa!
          Belloo! Hana dul sae belloo! Tatata bala tu gelatooo. Chasy tank yuuu!
          Underweaaar belloo! Gelatooo.
        </section>
      </Step>
      <Step id="third">
        <section>
          Poopayee poulet tikka masala potatoooo aaaaaah pepete gelatooo baboiii
          daa. Bananaaaa potatoooo poulet tikka masala hana dul sae uuuhhh
          tulaliloo. Poopayee jiji tank yuuu! Jiji potatoooo bappleees belloo!
          Uuuhhh bappleees chasy.
        </section>
      </Step>
    </Steps>
    <Navigation
      render={({ activeStepIndex, goToNextStep, goToPrevStep, totalSteps }) => (
        <div>
          {activeStepIndex > 0 && <button onClick={goToPrevStep}>Back</button>}
          {activeStepIndex < totalSteps - 1 && (
            <button onClick={goToNextStep}>Next</button>
          )}
        </div>
      )}
    />
  </Wizard>
);
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
      <Wizard
        activeStepIndex={this.state.activeStepIndex}
        onStepChanged={({ activeStepIndex }) => {
          this.setState({ activeStepIndex });
          console.log(`Step changed: ${activeStepIndex}`);
        }}
      >
        <Steps>
          <Step id="first">
            <section>
              Minions ipsum tulaliloo la bodaaa tatata bala tu la bodaaa.
              Aaaaaah para tú aaaaaah hahaha ti aamoo! Bappleees belloo! Tatata
              bala tu bappleees. Uuuhhh para tú underweaaar poopayee hahaha
              chasy me want bananaaa! Potatoooo ti aamoo! Baboiii.
            </section>
          </Step>
          <Step id="second">
            <section>
              Belloo! tatata bala tu chasy poopayee ti aamoo! Para tú bee do bee
              do bee do belloo! Tatata bala tu hahaha bappleees me want
              bananaaa! Belloo! Hana dul sae belloo! Tatata bala tu gelatooo.
              Chasy tank yuuu! Underweaaar belloo! Gelatooo.
            </section>
          </Step>
          <Step id="third">
            <section>
              Poopayee poulet tikka masala potatoooo aaaaaah pepete gelatooo
              baboiii daa. Bananaaaa potatoooo poulet tikka masala hana dul sae
              uuuhhh tulaliloo. Poopayee jiji tank yuuu! Jiji potatoooo
              bappleees belloo! Uuuhhh bappleees chasy.
            </section>
          </Step>
        </Steps>
        <Navigation
          render={({
            activeStepIndex,
            goToNextStep,
            goToPrevStep,
            totalSteps
          }) => (
            <div>
              {activeStepIndex > 0 && (
                <button onClick={goToPrevStep}>Back</button>
              )}
              {activeStepIndex < totalSteps - 1 && (
                <button onClick={goToNextStep}>Next</button>
              )}
            </div>
          )}
        />
      </Wizard>
    );
  }
}
```

[![Edit react-wizr controlled](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yprkvpm4wz)

### Routed

```
const App = () => (
  <Router>
    <Switch>
      <Route
        path="/steps"
        render={({ history, match: { url } }) => (
          <Wizard
            history={history}
            baseUrl={url}
            onStepChanged={({ activeStepIndex }) =>
              console.log(`Step changed: ${activeStepIndex}`)
            }
          >
            <Steps>
              <Step id="first">
                <section>
                  Minions ipsum tulaliloo la bodaaa tatata bala tu la bodaaa.
                  Aaaaaah para tú aaaaaah hahaha ti aamoo! Bappleees belloo!
                  Tatata bala tu bappleees. Uuuhhh para tú underweaaar poopayee
                  hahaha chasy me want bananaaa! Potatoooo ti aamoo! Baboiii.
                </section>
              </Step>
              <Step id="second">
                <section>
                  Belloo! tatata bala tu chasy poopayee ti aamoo! Para tú bee do
                  bee do bee do belloo! Tatata bala tu hahaha bappleees me want
                  bananaaa! Belloo! Hana dul sae belloo! Tatata bala tu
                  gelatooo. Chasy tank yuuu! Underweaaar belloo! Gelatooo.{' '}
                </section>
              </Step>
              <Step id="third">
                <section>
                  Poopayee poulet tikka masala potatoooo aaaaaah pepete gelatooo
                  baboiii daa. Bananaaaa potatoooo poulet tikka masala hana dul
                  sae uuuhhh tulaliloo. Poopayee jiji tank yuuu! Jiji potatoooo
                  bappleees belloo! Uuuhhh bappleees chasy.
                </section>
              </Step>
            </Steps>
            <Navigation
              render={({
                activeStepIndex,
                goToNextStep,
                goToPrevStep,
                totalSteps
              }) => (
                <div>
                  {activeStepIndex > 0 && (
                    <button onClick={goToPrevStep}>Back</button>
                  )}
                  {activeStepIndex < totalSteps - 1 && (
                    <button onClick={goToNextStep}>Next</button>
                  )}
                </div>
              )}
            />
          </Wizard>
        )}
      />
      <Redirect from="/" to="/steps" />
    </Switch>
  </Router>
);
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l2jmypvp1m)

## Built With

* [React](https://reactjs.org)
* [ReactDOM](https://reactjs.org/docs/react-dom.html)

## Authors

* **Vicent Gozalbes** - *Initial work* - [vigosan](https://github.com/vigosan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

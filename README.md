# react-wizr

React library for building declarative wizards

## Example

```
const WizardPage = () => (
  <div className="WizardPage">
    <Wizard
      onStepChanged={({ activeStepIndex }) =>
        console.log(`Step changed: ${activeStepIndex}`)}
    >
      <Steps>
        <Step path="select-country">
          <Navigation
            render={({ goToNextStep }) => {
              return <CountrySelectionStep onSelected={goToNextStep} />;
            }}
          />
        </Step>
        <Step path="payment-info">
          <CustomerInformationStep />
        </Step>
        <Step path="payment-information">
          <Navigation
            render={({ goToNextStep }) => {
              return (
                <div>
                  <PaymentMethodSelectionStep onSelected={goToNextStep} />
                </div>
              );
            }}
          />
        </Step>
      </Steps>
    </Wizard>
  </div>
);
```

## Built With

* [React](https://reactjs.org)
* [ReactDOM](https://reactjs.org/docs/react-dom.html)

## Authors

* **Vicent Gozalbes** - *Initial work* - [vigosan](https://github.com/vigosan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

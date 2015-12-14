//libs
const React     = require('react');
const ReactDOM  = require('react-dom');
const _         = require('underscore');

//lib components
const PageHeader  = require('react-bootstrap/lib/PageHeader');
const Panel       = require('react-bootstrap/lib/Panel');
const PanelGroup  = require('react-bootstrap/lib/PanelGroup');
const Alert       = require('react-bootstrap/lib/Alert');

//components
const EnabledToggle     = require('./components/enabledToggle');
const PredefinedColors  = require('./components/predefinedColors');
const CustomColor       = require('./components/customColor');

//data
const Config = require('./data/config');

//helper class
const Helper = require('./helper');

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      config: {
        predefinedColors: [],
        customColor: [],
        isEnabled: false,
        currentColor: '6f5499'
      }
    };
  }

  componentDidMount(){
    Config.get().done((data) => {
      if(data){
        this.setState({ config: _.extend({}, this.state.config, data) });
      }
    });
  }

  configChange(value){
    if(value){
      this.setState({ config: _.extend({}, this.state.config, value) }, () => {
        Config.update(this.state.config).done((success) => {
          this.setAlertState(success);
        });
      });
    }
  }

  setAlertState(isSuccess){
    let alertState = { showAlert: true };

    if(isSuccess){
      alertState.successAlert = true;
    }
    else {
      alertState.errorAlert = true;
    }

    this.setState(alertState);
  }

  handleErrorAlertDismiss(){
    this.setState({
      showAlert: false,
      successAlert: false
    });
  }

  handleSuccessAlertDismiss(){
    this.setState({
      showAlert: false,
      successAlert: false
    });
  }

  handleEnabledToggled(){
    let newEnabledStatus = !this.state.config.isEnabled;
    this.configChange({ isEnabled: newEnabledStatus });
  }

  handleSelectCustomColor(color, addAsPredefined){
    let config = this.state.config;
    let { predefinedColors: predefined } = config;

    if(addAsPredefined){
      if(predefined.indexOf(color) > - 1){
        this.configChange({ currentColor: color });
      }
      else {
        this.configChange({
          predefinedColors: [color, ...predefined],
          currentColor: color
        });
      }
    }
    else {
      this.configChange({ currentColor: color });
    }
  }

  handleRandomClick(){
    const randColorString = (Math.random()*0xFFFFFF<<0).toString(16).toUpperCase();
    this.configChange({ currentColor: randColorString });
  }

  renderAlert(){
    if(this.state.showAlert){
      if(this.state.errorAlert){
        return (
          <Alert bsStyle="danger" onDismiss={ this.handleErrorAlertDismiss.bind(this) }>
           <h4>Oh snap! An error occured updating your config!</h4>
          </Alert>
        );
      }
      if(this.state.successAlert){
        return (
          <Alert bsStyle="success" onDismiss={ this.handleSuccessAlertDismiss.bind(this) }>
           <h4>Config updated.</h4>
          </Alert>
        );
      }
    }
    else {
      return (<span/>);
    }
  }

  render(){
    let headerStyles = {
      'color': Helper.getIdealTextColor(this.state.config.currentColor),
      'background': '#' + this.state.config.currentColor,
      'padding': '20px',
      'marginLeft': '-20px',
      'marginRight': '-20px',
      'marginTop': '-20px'
    };

    return (
      <div className="app container-fluid">
        <div className="row" style={ headerStyles }>
          <div className="col-xs-12 col-sm-6 col-md-10">
            <h1> Color Manager </h1>
          </div>
          <div className="col-xs-12 col-md-2 current-color-name">
            <span className="current-color-name-label"> Current Color: </span>
            <span>{ '#' + this.state.config.currentColor } </span>
          </div>
        </div>

        { this.renderAlert() }

        <EnabledToggle
          config={ this.state.config }
          onEnabledToggled={ this.handleEnabledToggled.bind(this) }
        />

        <PanelGroup defaultActiveKey={1} accordion>
          <Panel header="Predefined Colors" eventKey="1">
            <PredefinedColors
              onColorChanged={ this.configChange.bind(this) }
              onPredefinedColorsChanged = { this.configChange.bind(this) }
              config={ this.state.config }
            />
          </Panel>
          <Panel header="Custom Color" eventKey="2">
            <CustomColor
              selectCustomColor={ this.handleSelectCustomColor.bind(this) }
              config={ this.state.config }
              />
          </Panel>
          <Panel header="Random Color" eventKey="3">
            <button className="btn btn-primary btn-large btn-block" onClick={ this.handleRandomClick.bind(this) }>
              Party Mode!
            </button>
          </Panel>
       </PanelGroup>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('color-manager')
);

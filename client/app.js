const React     = require('react');
const ReactDOM  = require('react-dom');
const _         = require('underscore');

const PageHeader  = require('react-bootstrap/lib/PageHeader');
const Panel       = require('react-bootstrap/lib/Panel');
const PanelGroup  = require('react-bootstrap/lib/PanelGroup');
const Alert       = require('react-bootstrap/lib/Alert');

//components
const PredefinedColors  = require('./components/predefinedColors');
const EnabledToggle     = require('./components/enabledToggle');

//data
const Config = require('./data/config');

//helper class
const Helper = require('./helper');

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      config: {
        predefinedColors:[],
        customColor: [],
        isEnabled: false,
        currentColor: '6f5499'
      },
      activePanelKey: 1
    };
  }

  componentDidMount(){
    Config.get().done(function(data){
      if(data){
        let curConfig = this.state.config;

        this.setState({ config: _.extend(curConfig, data) });
      }
    }.bind(this));
  }

  configChange(value){
    if(value){
      var curConfig = this.state.config;

      this.setState({ config: _.extend(curConfig, value) }, () => {
        Config.update(this.state.config).done((success) => {
          if(success){
            this.setState({
              showAlert: true,
              successAlert: true
            });
          }
          else {
            this.setState({
              showAlert: true,
              errorAlert: true
            });
          }
        });
      });
    }
  }

  handlePanelChange(activePanelKey) {
    this.setState({ activePanelKey });
  }

  handleErrorAlertDismiss(){
    this.setState({
      showAlert: false,
      successAlert: false
    });
  }

  handleErrorAlertDismiss(){
    this.setState({
      showAlert: false,
      successAlert: false
    });
  }

  handleToggleEnabled(){
    let newEnabledStatus = !this.state.config.isEnabled;
    this.configChange({ isEnabled: newEnabledStatus });
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
          <Alert bsStyle="success" onDismiss={ this.handleErrorAlertDismiss.bind(this) }>
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
    var headerStyles = {
      'color': Helper.idealTextColor(this.state.config.currentColor),
      'background': '#' + this.state.config.currentColor,
      'padding': '20px',
      'marginLeft': '-20px',
      'marginRight': '-20px',
      'marginTop': '-20px'
    };

    return (
      <div className="app container-fluid">
        <PageHeader style={headerStyles}>
          Color Manager
          <div className="pull-right">
            <span>Current Color: { this.state.config.currentColor }</span>
          </div>
        </PageHeader>
        { this.renderAlert() }
        <EnabledToggle
          config={ this.state.config }
          onToggleEnabled={ this.handleToggleEnabled.bind(this) }
        />
        <PanelGroup activeKey={this.state.activePanelKey} onSelect={this.handlePanelChange.bind(this)} accordion>
         <Panel header="Predefined Colors" eventKey="1">
           <PredefinedColors onColorChanged={ this.configChange.bind(this) } config={ this.state.config } />
         </Panel>
         <Panel header="Custom Color" eventKey="2">Panel 2 content</Panel>
         <Panel header="Random Color" eventKey="3">Panel 3 content</Panel>
       </PanelGroup>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('color-manager')
);

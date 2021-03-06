//libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import underscore from 'underscore';

//lib components
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

//components
import AlertSection from '../components/alertSection';
import EnabledToggle from '../components/enabledToggle';
import ScheduleOverride from '../components/scheduleOverride';
import PredefinedColors from '../components/predefinedColors';
import CustomColor from '../components/customColor';

//utils
import Helper from '../util/helper';

//actions
import * as ConfigActions from '../actions'

export default class AppContainer extends Component {
  handleEnabledToggled(){
    this.updateConfig('isEnabled', !this.props.config.isEnabled);
  }

  handleScheduleToggled(){
    this.updateConfig('isUsingSchedule', !this.props.config.isUsingSchedule);
  }

  handleRandomClick(){
    const randColorString = (Math.random()*0xFFFFFF<<0).toString(16).toUpperCase();
    this.updateConfig('currentColor', randColorString);
  }

  handleColorChanged(color){
    this.updateConfig('currentColor', color);
  }

  handlePredefinedColorsChange(predefinedColors){
    this.updateConfig('predefinedColors', predefinedColors);
  }

  handleCustomColorChanged(color, saveAsPredefined){
    let { config } = this.props;

    config.currentColor = color;

    if(saveAsPredefined){
      config.predefinedColors = [color, ...config.predefinedColors];
    }

    this.props.saveConfig(config);
  }

  updateConfig(property, newValue){
    let { config } = this.props;
    config[property] = newValue;

    this.props.saveConfig(config);
  }

  render(){
    let headerStyles = {
      'color': Helper.getIdealTextColor(this.props.config.currentColor),
      'background': '#' + this.props.config.currentColor,
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
            <span>{ '#' + this.props.config.currentColor } </span>
          </div>
        </div>

        <AlertSection
          showSuccess={ this.props.alertStatus.showSuccessAlert }
          showFailure={ this.props.alertStatus.showFailureAlert }
          onDismiss={ this.props.dismissAlerts }
        />

        <EnabledToggle
          config={ this.props.config }
          onEnabledToggled={ this.handleEnabledToggled.bind(this) }
        />

        <ScheduleOverride
          config={ this.props.config }
          onToggled={ this.handleScheduleToggled.bind(this) }
        />

        <PanelGroup defaultActiveKey={1} accordion>
          <Panel header="Predefined Colors" eventKey="1">
            <PredefinedColors
              onColorChanged={ this.handleColorChanged.bind(this) }
              onPredefinedColorsChanged={ this.handlePredefinedColorsChange.bind(this) }
              config={ this.props.config }
            />
          </Panel>
          <Panel header="Custom Color" eventKey="2">
            <CustomColor
              config={ this.props.config }
              selectCustomColor={ this.handleCustomColorChanged.bind(this) }
            />
          </Panel>
          <Panel header="Random Color" eventKey="3">
            <button className="btn btn-primary btn-large btn-block" onClick={ this.handleRandomClick.bind(this)  }>
              Party Mode!
            </button>
          </Panel>
       </PanelGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config : state.config,
    alertStatus : state.alertStatus
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

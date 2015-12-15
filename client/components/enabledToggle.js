import React from 'react';
import Input from 'react-bootstrap/lib/Input';

class EnabledToggle extends React.Component {
  handleChangeClicked(){
    this.props.onEnabledToggled();
  }

  render(){
    const { isEnabled } = this.props.config;
    const label = 'On/Off';

    if(isEnabled){
      return (
        <div className="enabled-toggle">
          <Input
            type="checkbox"
            label={ label }
            onChange={ this.handleChangeClicked.bind(this) }
            checked
          />
        </div>
      );
    }
    return (
      <div className="enabled-toggle">
        <Input
          type="checkbox"
          label={ label }
          onChange={ this.handleChangeClicked.bind(this) }
        />
      </div>
    );
  }
}

EnabledToggle.propTypes = {
  config: React.PropTypes.object.isRequired,
  onEnabledToggled: React.PropTypes.func.isRequired
};

export default EnabledToggle;

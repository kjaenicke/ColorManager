import React from 'react';
import Input from 'react-bootstrap/lib/Input';

class EnabledToggle extends React.Component {
  render(){
    return (
      <div className="enabled-toggle">
        <Input
          type="checkbox"
          label="On/Off"
          onChange={ () => this.props.onEnabledToggled() }
          checked={ this.props.isEnabled ? 'checked' : '' }
        />
      </div>
    );
  }
}

EnabledToggle.propTypes = {
  isEnabled: React.PropTypes.bool,
  onEnabledToggled: React.PropTypes.func.isRequired
};

export default EnabledToggle;

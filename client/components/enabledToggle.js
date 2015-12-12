const React = require('react');

const Input = require('react-bootstrap/lib/Input');

class EnabledToggle extends React.Component {
  constructor(props){
    super(props);
  }

  onCheckClicked(evt){
    this.props.onEnabledToggled && this.props.onEnabledToggled();
  }

  render(){
    if(this.props.config.isEnabled){
      return (
        <div className="enabled-toggle">
          <Input
          name={ this.props.color }
          type="checkbox"
          label="On/Off"
          onClick={ this.onCheckClicked.bind(this) }
          checked />
        </div>
      );
    }
    else {
      return (
        <div className="enabled-toggle">
          <Input
          name={ this.props.color }
          type="checkbox"
          label="On/Off"
          onClick={ this.onCheckClicked.bind(this) } />
        </div>
      );

    }
  }
}

module.exports = EnabledToggle;

import React from 'react';
import Input from 'react-bootstrap/lib/Input';

class ScheduleOverride extends React.Component {
  handleChangeClicked(){
    this.props.onToggled();
  }

  render(){
    const { isUsingSchedule } = this.props.config;
    const label = 'Override Schedule?';

    if(!isUsingSchedule){
      return (
        <div className="schedule-toggle">
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
      <div className="schedule-toggle">
        <Input
          type="checkbox"
          label={ label }
          onChange={ this.handleChangeClicked.bind(this) }
        />
      </div>
    );
  }
}

ScheduleOverride.propTypes = {
  config: React.PropTypes.object.isRequired,
  onToggled: React.PropTypes.func.isRequired
};

export default ScheduleOverride;

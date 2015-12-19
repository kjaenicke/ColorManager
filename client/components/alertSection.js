import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

class AlertSection extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.showSuccess){
      return (
        <Alert bsStyle="success" onDismiss={ this.props.onDismiss }>
          <h4>Config saved.</h4>
        </Alert>
      );
    }
    if(this.props.showFailure){
      return (
        <Alert bsStyle="danger" onDismiss={ this.props.onDismiss }>
          <h4>Oh snap! Config failed to save.</h4>
        </Alert>
      );
    }

    return <span />;
  }
}

AlertSection.propTypes = {
  showSuccess: React.PropTypes.bool,
  showFailure: React.PropTypes.bool,
  onDismiss: React.PropTypes.func.isRequired
};

export default AlertSection;

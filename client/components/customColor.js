const React = require('react');
const ColorPicker = require('react-color');
const Input = require('react-bootstrap/lib/Input');

module.exports = class CustomColor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      color: '#FFFFFF',
      saveAsPredefined: false
    };
  }

  handleColorChange(color){
    this.setState({ color: String(color.hex).toUpperCase() });
  }

  handleCheckClicked(evt){
    this.setState({ saveAsPredefined: !!evt.target.checked });
  }

  handleSave(){
    if(typeof this.props.selectCustomColor === 'function' && this.state.color){
      let color = this.state.color;

      this.props.selectCustomColor(color.replace('#'), this.state.saveAsPredefined);
    }
  }

  render(){
     return (
        <div className="custom-color row-fluid">
          <div className="col-xs-12 col-md-6">
            <ColorPicker
              type="sketch"
              positionCSS={{ 'margin': '0px auto' }}
              color={ this.state.color }
              onChange={ this.handleColorChange.bind(this) }
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <Input
              type="checkbox"
              label="Save as predefined?"
              onClick={ this.handleCheckClicked.bind(this) }
              checked={ this.state.saveAsPredefined ? 'checked' : false }
            />
            <button className="btn btn-primary btn-lg btn-block save-custom" onClick={ this.handleSave.bind(this) }>
              Save
            </button>
          </div>
        </div>
     );
  }
}

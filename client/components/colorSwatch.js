const React = require('react');
const Input = require('react-bootstrap/lib/Input');

class ColorSwatch extends React.Component {
  constructor(props){
    super(props);
  }

  onColorSelected(evt){
    let color = evt.target.value;

    if(color && this.props.onColorChanged){
      this.props.onColorChanged({ currentColor: color });
    }
  }

  render(){
    let style = {
      'width': '80px',
    	'height': '80px',
    	'MozBorderRadius': '40px',
    	'WebkitBorderRadius': '40px',
    	'borderRadius': '40px'
    };

    style.backgroundColor = this.props.color ? '#' + this.props.color : 'black';

    return (
        <div className="col-xs-2">
           <div className="color-swatch" style={style}></div>
           <Input name="colorSwatch" type="radio" label={ this.props.color } onClick={ this.onColorSelected.bind(this) } value={this.props.color} />
        </div>
    );
  }
}

module.exports = ColorSwatch;

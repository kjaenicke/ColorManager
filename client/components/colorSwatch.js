import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import classNames from 'classnames';

class ColorSwatch extends React.Component {
  constructor(props){
    super(props);
  }

  onColorSelected(evt){
    this.props.onColorChanged({ currentColor: this.props.color });
  }

  render(){
    let style = {
      'width': '80px',
    	'height': '80px',
    	'MozBorderRadius': '40px',
    	'WebkitBorderRadius': '40px',
    	'borderRadius': '40px',
      'margin': '0px auto'
    };

    style.backgroundColor = this.props.color ? '#' + this.props.color : 'black';

    let containerClasses = classNames({
      'col-xs-12': true,
      'col-md-2': true,
      'color-swatch-container': true,
      'active': this.props.active
    });

    return (
        <div className={ containerClasses } onClick={ this.onColorSelected.bind(this) }>
           <div className="color-swatch" style={style}></div>
           <span>#{ this.props.color }</span>
        </div>
    );
  }
}

ColorSwatch.propTypes = {
  active: React.PropTypes.bool,
  color: React.PropTypes.string.isRequired,
  onColorChanged: React.PropTypes.func.isRequired
};

export default ColorSwatch;

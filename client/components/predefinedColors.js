const React = require('react');
const ColorSwatch = require('./colorSwatch');

class PredefinedColors extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let colors = this.props.config.predefinedColors.map((c, index) => {
        let active = c === this.props.config.currentColor;

        return (<ColorSwatch active={active} onColorChanged={this.props.onColorChanged} key={index} color={c} />);
    });

    return (
      <div className="predefined-colors row-fluid">
        { colors }
      </div>
    );
  }
}

module.exports = PredefinedColors;

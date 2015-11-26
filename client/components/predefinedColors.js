const React = require('react');
const ColorSwatch = require('./colorSwatch');

class PredefinedColors extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let colors = this.props.config.predefinedColors.map((c, index) => {
        return (<ColorSwatch onColorChanged={this.props.onColorChanged} key={index} color={c} />);
    });

    return (
      <div className="predefined-colors row-fluid">
        { colors }
      </div>
    );
  }
}

module.exports = PredefinedColors;

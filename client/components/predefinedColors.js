const React = require('react');
const ColorSwatch = require('./colorSwatch');
const _ = require('underscore');

class PredefinedColors extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: false,
      colorsToRemove: []
    };
  }

  handleEditButtonClick(){
    this.setState({ editing: true });
  }

  handleDeleteButtonClick(){
    let predefinedColors = this.props.config.predefinedColors;

    this.props.onPredefinedColorsChanged({ predefinedColors: _.difference(predefinedColors, this.state.colorsToRemove ) });
    this.setState({
      editing: false,
      colorsToRemove: []
    });
  }

  handleCancelButtonClick(){
    this.setState({
      editing: false,
      colorsToRemove: []
    });
  }

  handleColorSelected(colorObj){
    let color = colorObj.currentColor;

    if(this.state.editing){
      let colors = this.state.colorsToRemove;

      if(colors.indexOf(color) > -1){
        colors = _.reject(colors, c => c === color);
      }
      else {
        colors = [...colors, color];
      }

      this.setState({ colorsToRemove: colors });
    }
    else {
      this.props.onColorChanged(colorObj);
    }
  }

  /*eslint-disable */
  render(){
    if(this.props.config.predefinedColors.length > 0){
      let colors = this.props.config.predefinedColors.map((c, index) => {
          let active = false;

          if(this.state.editing){
            if(this.state.colorsToRemove.indexOf(c) > -1){
              active = true;
            }
          }
          else {
            if(c === this.props.config.currentColor){
              active = true;
            }
          }

          return (
            <ColorSwatch
              active={ active }
              onColorChanged={ this.handleColorSelected.bind(this) }
              key={index}
              color={c}
            />
          );
      });

      let editButton = !this.state.editing ? (
        <div className="col-xs-2 col-xs-offset-10">
          <button className="btn btn-default pull-right edit-predefined-colors" onClick={ this.handleEditButtonClick.bind(this) }>
            Edit
          </button>
        </div>
      ) : (<span/>);

      let confirmDelete = this.state.editing ? (
        <div className="row-fluid">
          <div className="col-xs-6">
          <button className="btn btn-default delete-predefined-colors pull-left" onClick={ this.handleCancelButtonClick.bind(this) }>
            Cancel
          </button>
        </div>
        <div className="col-xs-6">
          <button className="btn btn-danger pull-right" onClick={ this.handleDeleteButtonClick.bind(this) }>
            Delete
          </button>
        </div>
      </div>
      ) : (<span />);

      return (
        <div className="predefined-colors row-fluid">
          <div className="row-fluid">
            { editButton }
          </div>
          { colors }
          { confirmDelete }
        </div>
      );
    }

    return (
      <div className="predefined-colors row-fluid">
        <h3>No colors saved.</h3>
      </div>
    );
  }
  /*eslint-enable */
}

module.exports = PredefinedColors;

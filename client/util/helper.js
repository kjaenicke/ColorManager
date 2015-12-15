class Helper {
  static getIdealTextColor(bgColor) {
    bgColor = String(bgColor).indexOf('#') > -1 ? bgColor : '#' + bgColor;

    let nThreshold = 105;
    let components = Helper.getRGBComponents(bgColor);
    let bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
  }

  static getRGBComponents(color) {
    let r = color.substring(1, 3);
    let g = color.substring(3, 5);
    let b = color.substring(5, 7);

    return {
       R: parseInt(r, 16),
       G: parseInt(g, 16),
       B: parseInt(b, 16)
    };
  }
}

module.exports = Helper;

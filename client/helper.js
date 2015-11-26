class Helper {
  static idealTextColor(bgColor) {
    bgColor = String(bgColor).indexOf('#') > -1 ? bgColor : '#' + bgColor;

    var nThreshold = 105;
    var components = Helper.getRGBComponents(bgColor);
    var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
  }

  static getRGBComponents(color) {
    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
       R: parseInt(r, 16),
       G: parseInt(g, 16),
       B: parseInt(b, 16)
    };
  }
}

module.exports = Helper;

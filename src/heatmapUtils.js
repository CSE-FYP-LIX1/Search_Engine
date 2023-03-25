export const severityHexColors = [
    "#FFFFFF",
    "#ffcccc",
    "#ff9999",
    "#ff6666",
    "#ff3333",
    "#ff0000"
  ];
  /**
   * Normalize a value using the min-max method
   * @param value The value to normalize
   * @param min The min of the range
   * @param max The max of the range
   * @returns {number}
   */
  export const normalizeMinMax = (value, min, max) => (value - min) / (max - min);
  
  /**
   * Scale a range [min,max] to [minAllowed,maxAllowed].
   * @param unscaledNum The number to scale to the new range
   * @param minAllowed  The min of the new range to be scaled to
   * @param maxAllowed  The max of the new range to be scaled to
   * @param min The min of the original range in which unscaledNum is included
   * @param max The max of the original range in which unscaledNum is included
   * @returns {number}
   */
  export const scaleBetween = (unscaledNum, minAllowed, maxAllowed, min, max) =>
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed;
  
  // Based on https://stackoverflow.com/a/39077686/1378236
  
  /**
   * Convert RGB to hex string
   *
   * Example: rgbToHex(0, 51, 255) => '#0033ff'
   *
   * @returns {string} of hex conversion of RGB values supplied
   */
  export const rgbToHex = (r, g, b) =>
    `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
  export const rgbObjectToHex = rgb => rgbToHex(rgb.r, rgb.g, rgb.b);
  
  /**
   * Convert a hex color string to an RGB number array. Supports hex shorthand triplet.
   *
   * Example: hexToRgb("#0033ff") => [0, 51, 255]
   * Example: hexToRgb("#03f") => [0, 51, 255]
   * @returns {number[]} representing [r,g,b] channels
   */
  export const hexToRgb = hex =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16));
  
  export const hexToRgbObject = hex => {
    const [r, g, b] = hexToRgb(hex);
    return { r, g, b };
  };
  
  export const colors = severityHexColors.map(hex => hexToRgbObject(hex));
  
  function interpolate(channel, idx1, idx2, fractBetween) {
    return Math.floor(
      (colors[idx2][channel] - colors[idx1][channel]) * fractBetween +
        colors[idx1][channel]
    );
  }
  
  export const getColor = (x, y, xSize, ySize) => {
    // add 1 to all values since we don't want them to zero out in multiplication
    let value = normalizeMinMax((x + 1) * (y + 1), 1, (xSize + 1) * (ySize + 1));
  
    // Our desired color will be between these two indexes in `colors`.
    let idx1;
    let idx2;
  
    let fractBetween = 0; // Fraction between "idx1" and "idx2" where our value is.
    const numColors = colors.length;
  
    if (value <= 0) {
      // accounts for an input <=0
      idx1 = 0;
      idx2 = 0;
    } else if (value >= 1) {
      // accounts for an input >=0
      idx1 = numColors - 1;
      idx2 = numColors - 1;
    } else {
      value *= numColors - 1; // Will multiply value by 2.
      idx1 = Math.floor(value); // Our desired color will be after this index.
      idx2 = idx1 + 1; // ... and before this index (inclusive).
      fractBetween = value - idx1; // Distance between the two indexes (0-1).
    }
    return {
      r: interpolate("r", idx1, idx2, fractBetween),
      g: interpolate("g", idx1, idx2, fractBetween),
      b: interpolate("b", idx1, idx2, fractBetween)
    };
  };
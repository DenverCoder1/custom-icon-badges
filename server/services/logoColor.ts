/**
 * Color aliases from shields.io
 * https://github.com/badges/shields/blob/7d452472defa0e0bd71d6443393e522e8457f856/badge-maker/lib/color.js#L5-L26
 */
const namedColors: { [key: string]: string } = {
  brightgreen: '#4c1',
  green: '#97ca00',
  yellow: '#dfb317',
  yellowgreen: '#a4a61d',
  orange: '#fe7d37',
  red: '#e05d44',
  blue: '#007ec6',
  grey: '#555',
  lightgrey: '#9f9f9f',
};

const aliases: { [key: string]: string } = {
  gray: 'grey',
  lightgray: 'lightgrey',
  critical: 'red',
  important: 'orange',
  success: 'brightgreen',
  informational: 'blue',
  inactive: 'lightgrey',
};

/**
 * Check if color is a hex color without #
 * @param color color to check
 * @returns {boolean} whether the color is valid
 */
function isHexColor(color: string): boolean {
  return /^([\da-f]{3}){1,2}$/i.test(color);
}

/**
 * Takes in a color parameter and returns a valid color
 * @param color color to normalize
 * @returns {string} normalized color
 */
export function normalizeColor(color: string): string {
  // if color is in the list of named colors, return the hex color
  if (color in namedColors) {
    return namedColors[color];
  }
  // if color is in the list of aliases, return the hex color
  if (color in aliases) {
    return namedColors[aliases[color]];
  }
  // if hex with no `#`, add `#` at beginning
  if (isHexColor(color)) {
    return `#${color}`;
  }
  // remove invalid characters
  return color.replace(/[^\w (),#%]/gi, '');
}

/**
 * Takes in the base64 encoded svg and adds fill color to all objects and paths
 * @param data base64 encoded svg
 * @param logoColor color to fill with
 * @returns {string} base64 encoded svg with fill color
 */
export function setLogoColor(data: string, logoColor: string): string {
  // decode base64
  const decoded = Buffer.from(data, 'base64').toString('utf8');
  // validate color
  const color = normalizeColor(logoColor);
  // insert style tag after opening svg tag
  const svg = decoded.replace(/<svg[^>]*>/, `$&<style>* { fill: ${color} !important; }</style>`);
  // convert back to base64
  return Buffer.from(svg, 'utf8').toString('base64');
}

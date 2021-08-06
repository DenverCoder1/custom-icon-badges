/*
  Takes in a color parameter and returns a valid color
*/
function makeColor(color: string): string {
  // if hex with no `#`, add `#` at beginning
  if (/^([\da-f]{3}){1,2}$/i.test(color)) {
    return `#${color}`;
  }
  // remove invalid characters
  return color.replace(/[^\w (),#%]/gi, '');
}

/*
  Takes in the base64 encoded svg and adds fill color to all objects and paths
*/
function setLogoColor(data: string, logoColor: string): string {
  // decode base64
  const decoded = Buffer.from(data, 'base64').toString('utf8');
  // validate color
  const color = makeColor(logoColor);
  // insert style tag after opening svg tag
  const svg = decoded.replace(/<svg[^>]*>/, `$&<style>* { fill: ${color}!important; }</style>`);
  // convert back to base64
  return Buffer.from(svg, 'utf8').toString('base64');
}

export default setLogoColor;

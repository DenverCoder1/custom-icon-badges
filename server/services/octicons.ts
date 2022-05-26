import octicons, { IconName } from '@primer/octicons';

/**
 * Check if a slug exists in Octicons and return the icon if it does
 * @param {string} slug The slug to look for
 * @returns {Object} The icon data if it exists, null otherwise
 */
async function getIcon(slug: string):
  Promise<{ slug: string, type: string, data: string } | null> {
  const normalized = slug.toLowerCase();
  if (!(normalized in octicons)) {
    return null;
  }
  const icon = octicons[normalized as IconName];
  // add 'xmlns' and 'fill' attribute to the svg
  const svg = icon.toSVG().replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" fill="whitesmoke"');
  return {
    slug: icon.symbol,
    type: 'svg+xml',
    data: Buffer.from(svg, 'utf8').toString('base64'),
  };
}

const defaultExport = {
  getIcon,
};

export default defaultExport;

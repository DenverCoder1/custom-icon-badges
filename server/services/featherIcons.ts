import feather, { FeatherIcon } from 'feather-icons';

/**
 * Check if a slug exists in Feather Icons and return the icon if it does
 * @param {string} slug The slug to look for
 * @returns {Object} The icon data if it exists, null otherwise
 */
function getIcon(slug: string): { slug: string, type: string, data: string } | null {
  const normalized = slug.toLowerCase();
  if (!(normalized in feather.icons)) {
    return null;
  }
  // @ts-ignore
  const icon: FeatherIcon = feather.icons[normalized];
  const svg = icon.toSvg({ color: 'whitesmoke' });
  return {
    slug: icon.name,
    type: 'svg+xml',
    data: Buffer.from(svg, 'utf8').toString('base64'),
  };
}

const defaultExport = {
  getIcon,
};

export default defaultExport;

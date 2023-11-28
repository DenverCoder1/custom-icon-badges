import octicons, { IconName } from '@primer/octicons';
import IconsService from './IconsService.js';
import { normalizeColor } from '../logoColor.js';

class OcticonsService extends IconsService {
  public static async getIcon(
    slug: string,
    color: string | null = null,
  ): Promise<{ slug: string; type: string; data: string } | null> {
    const normalized = slug.toLowerCase();
    if (!(normalized in octicons)) {
      return null;
    }
    const icon = octicons[normalized as IconName];
    const normalizedColor = normalizeColor(color ?? 'whitesmoke');
    // add 'xmlns' and 'fill' attribute to the svg
    const svg = icon.toSVG().replace('<svg', `<svg xmlns="http://www.w3.org/2000/svg" fill="${normalizedColor}"`);
    return {
      slug: icon.symbol,
      type: 'svg+xml',
      data: Buffer.from(svg, 'utf8').toString('base64'),
    };
  }
}

export default OcticonsService;

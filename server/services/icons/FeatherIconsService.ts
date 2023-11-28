import feather, { FeatherIcon } from 'feather-icons';
import IconsService from './IconsService.js';
import { normalizeColor } from '../logoColor.js';

class FeatherIconsService extends IconsService {
  public static async getIcon(
    slug: string,
    color: string | null = null,
  ): Promise<{ slug: string; type: string; data: string } | null> {
    const normalized = slug.toLowerCase();
    if (!(normalized in feather.icons)) {
      return null;
    }
    // @ts-ignore - icon is checked above
    const icon: FeatherIcon = feather.icons[normalized];
    const normalizedColor = normalizeColor(color ?? 'whitesmoke');
    const svg = icon.toSvg({ color: normalizedColor });
    return {
      slug: icon.name,
      type: 'svg+xml',
      data: Buffer.from(svg, 'utf8').toString('base64'),
    };
  }
}

export default FeatherIconsService;

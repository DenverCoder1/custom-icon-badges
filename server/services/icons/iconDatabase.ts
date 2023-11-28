import dotenv from 'dotenv';
import monk, { FindResult } from 'monk';
import path from 'path';
import IconsService from './IconsService.js';
import { setLogoColor } from '../logoColor.js';

dotenv.config({ path: path.resolve('..', '.env') });

const DB_NAME = 'custom-icon-badges';
const DB_URL = process.env.DB_URL ?? `mongodb://localhost:27017/${DB_NAME}`;
const db = monk(DB_URL);
const icons = db.get('icons');
icons.createIndex({ slug: 1 }, { unique: true });

class IconDatabaseService extends IconsService {
  // eslint-disable-next-line no-unused-vars
  public static async getIcon(
    slug: string,
    color: string | null = null,
  ): Promise<{ slug: string; type: string; data: string } | null> {
    // find slug in database, returns null if not found
    const icon = await icons.findOne({ slug: slug.toLowerCase() });
    // return null if not found
    if (!icon) {
      return null;
    }
    // set color if it is not null
    const data = color && icon.type === 'svg+xml' ? setLogoColor(icon.data, color) : icon.data;
    // return icon
    return {
      slug: icon.slug,
      type: icon.type,
      data,
    };
  }

  /**
   * Insert a new icon into the database
   * @param {string} slug The slug to use for the icon
   * @param {string} type The type of icon to use (eg. 'png', 'svg+xml')
   * @param {string} data The base64 encoded data for the icon
   * @returns {Object} The icon data
   */
  public static async insertIcon(
    slug: string,
    type: string,
    data: string,
  ): Promise<{ slug: string; type: string; data: string }> {
    // create item
    const item = { slug: slug.toLowerCase(), type, data };
    // insert item
    await icons.insert(item);
    // return inserted item
    return item;
  }

  /**
   * Get all icons from the database
   * @returns {FindResult} The icons in the database
   */
  public static async getIcons(): Promise<FindResult<{ slug: string; type: string; data: string }>> {
    // return all items
    return icons.find({}, { sort: { _id: -1 } });
  }
}

export default IconDatabaseService;

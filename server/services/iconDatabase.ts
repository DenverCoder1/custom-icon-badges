import monk, { FindResult } from 'monk';

const DB_NAME = 'custom-icon-badges';
const DB_URL = process.env.DB_URL || `mongodb://localhost:27017/${DB_NAME}`;
const db = monk(DB_URL);
const icons = db.get('icons');
icons.createIndex({ slug: 1 }, { unique: true });

/**
 * Check if a slug exists in the database and return the icon if it does
 * @param {string} slug The slug to look for
 * @returns {Object} The icon data if it exists, null otherwise
 */
async function getIcon(slug: string):
  Promise<{ slug: string, type: string, data: string } | null> {
  // find slug in database, returns null if not found
  return icons.findOne({ slug: slug.toLowerCase() });
}

/**
 * Insert a new icon into the database
 * @param {string} slug The slug to use for the icon
 * @param {string} type The type of icon to use (eg. 'png', 'svg+xml')
 * @param {string} data The base64 encoded data for the icon
 * @returns {Object} The icon data
 */
async function insertIcon(slug: string, type: string, data: string):
  Promise<{ slug: string, type: string, data: string }> {
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
async function getIcons(): Promise<FindResult<{ slug: string, type: string, data: string }>> {
  // return all items
  return icons.find({}, { sort: { _id: -1 } });
}

const defaultExport = {
  getIcon,
  getIcons,
  insertIcon,
};

export default defaultExport;

import monk, { FindResult } from 'monk';

const DB_NAME = 'custom-icon-badges';
const DB_URL = process.env.DB_URL || `mongodb://localhost:27017/${DB_NAME}`;
const db = monk(DB_URL);
const icons = db.get('icons');
icons.createIndex({ slug: 1 }, { unique: true });

async function checkSlugExists(slug: string):
  Promise<{ slug: string, type: string, data: string } | null> {
  // find slug in database, returns null if not found
  return icons.findOne({ slug: slug.toLowerCase() });
}

async function insertIcon(slug: string, type: string, data: string):
  Promise<{ slug: string, type: string, data: string }> {
  // create item
  const item = { slug: slug.toLowerCase(), type, data };
  // insert item
  await icons.insert(item);
  // return inserted item
  return item;
}

async function getIcons(): Promise<FindResult<{ slug: string, type: string, data: string }>> {
  // return all items
  return icons.find({}, { sort: { _id: -1 } });
}

const defaultExport = {
  checkSlugExists,
  insertIcon,
  getIcons,
};

export default defaultExport;

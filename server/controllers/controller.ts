import axios from 'axios';
import { Request, Response } from 'express';
import getBadgeUrl from '../services/badgeUrl';
import iconDatabase from '../services/iconDatabase';

async function listIconsJSON(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    icons: await iconDatabase.getIcons(),
  });
}

async function getBadge(req: Request, res: Response): Promise<void> {
  const slug = (req.query.logo || '') as string;
  // check if slug exists
  const item = slug ? await iconDatabase.checkSlugExists(slug) : null;
  // get shields url
  const url = getBadgeUrl(req, item);
  // get badge from url
  const response = await axios.get(url, { validateStatus: () => true });
  // get type
  const contentType = response.headers['content-type'] || 'image/svg+xml';
  // send response
  res.status(response.status).type(contentType).send(response.data);
}

async function postIcon(req: Request, res: Response): Promise<void> {
  const { slug, type, data }: { slug: string, type: string, data: string } = req.body;
  if (!slug || !type || !data) {
    res.status(400).json({
      type: 'error',
      message: 'Bad request.',
      body: { slug, type, data },
    });
    return;
  }
  console.log(`Received icon for ${slug}`);
  // check for slug in the database
  const item = await iconDatabase.checkSlugExists(slug);
  // if slug does not yet exist, create it
  if (item === null) {
    console.log(`Creating new icon for ${slug}`);
    // create item
    const body = await iconDatabase.insertIcon(slug, type, data);
    // return success response
    res.status(200).json({
      type: 'success',
      message: 'Your icon has been added successfully.',
      body,
    });
    return;
  }
  console.log('Slug is already in use');
  // slug already exists
  res.status(409).json({
    type: 'error',
    message: 'This slug is already in use.',
    body: { slug, type, data },
  });
}

const defaultExport = {
  listIconsJSON,
  getBadge,
  postIcon,
};

export default defaultExport;

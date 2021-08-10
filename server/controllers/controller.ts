import axios from 'axios';
import { Request, Response } from 'express';
import getBadgeUrl from '../services/badgeUrl';
import iconDatabase from '../services/iconDatabase';

async function getBadge(req: Request, res: Response): Promise<void> {
  const slug = (req.query.logo || '') as string;
  // check that logo was passed
  if (!slug) {
    res.status(400).json({
      message: 'Bad Request: logo parameter not found',
    });
    return;
  }
  // check if slug exists
  const item = await iconDatabase.checkSlugExists(slug);
  // get shields url
  const url = getBadgeUrl(req, item);
  // get svg from url with axios
  const svg = await axios.get(url);
  // send svg with 200 response
  res.status(200).contentType('image/svg+xml').send(svg.data);
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
  getBadge,
  postIcon,
};

export default defaultExport;

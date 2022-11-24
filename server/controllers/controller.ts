import { Request, Response } from 'express';
import {
  BadgeError,
  fetchBadgeFromRequest,
  fetchDefaultBadge,
  fetchErrorBadge,
} from '../services/fetchBadges';
import iconDatabase from '../services/iconDatabase';
import octicons from '../services/octicons';

/**
 * List all icons in the database
 * @param {Request} _req The request object
 * @param {Response} res The response object
 */
async function listIconsJSON(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    icons: await iconDatabase.getIcons(),
  });
}

/**
 * Display a badge for the given parameters
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function getBadge(req: Request, res: Response): Promise<void> {
  let response = null;
  try {
    // get logo from query as a string, use nothing if multiple or empty
    const slug = typeof req.query.logo === 'string' ? req.query.logo : '';
    // check if slug exists
    const item = slug ? octicons.getIcon(slug) || await iconDatabase.getIcon(slug) : null;
    // get badge for item
    response = await fetchBadgeFromRequest(req, item);
  } catch (error) {
    // set response to error badge
    if (error instanceof BadgeError) {
      response = await fetchErrorBadge(error.message);
    } else {
      console.error(error);
      response = await fetchErrorBadge('something went wrong');
    }
  }
  // get content type
  const contentType = response.headers.get('content-type') || 'image/svg+xml';
  // send response
  res.status(response.status).type(contentType).send(await response.text());
}

/**
 * Add a new icon to the database
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function postIcon(req: Request, res: Response): Promise<void> {
  const { slug, type, data }: { slug: string, type: string, data: string } = req.body;

  // Check for missing fields in the request
  if (!slug || !type || !data) {
    res.status(400).json({
      type: 'error',
      message: 'Bad request.',
      body: { slug, type, data },
    });
    return;
  }

  console.info(`Received icon for ${slug}`);

  // get the badge for item data
  const logoBadgeResponse = await fetchBadgeFromRequest(req, { slug, type, data });
  // if the response is 414, the icon is too big
  if (logoBadgeResponse.status === 414) {
    res.status(logoBadgeResponse.status).json({
      type: 'error',
      message: 'The icon you uploaded is too big.',
      body: { slug, type, data },
    });
    return;
  }
  // check for other errors
  if (logoBadgeResponse.status >= 400) {
    res.status(logoBadgeResponse.status).json({
      type: 'error',
      message: `There was an error with your request. Status: ${logoBadgeResponse.status} - ${logoBadgeResponse.statusText}.`,
      body: { slug, type, data },
    });
    return;
  }

  // check for slug in the database
  const item = octicons.getIcon(slug) || await iconDatabase.getIcon(slug);

  // Get default badge with the logo set to the slug
  const defaultBadgeResponse = await fetchDefaultBadge(slug);
  const defaultBadgeResponseText = await defaultBadgeResponse.text();

  // Check if the slug is reserved
  // Slug is reserved if it is in the database or shields.io has an icon for it
  if (item !== null || defaultBadgeResponseText.match(/<image[^>]*>/) !== null) {
    console.info(`The slug ${slug} is already in use`);
    // slug already exists
    res.status(409).json({
      type: 'error',
      message: 'This slug is already in use.',
      body: { slug, type, data },
    });
    return;
  }

  // All checks passed, add the icon to the database
  console.info(`Creating new icon for ${slug}`);
  // create item
  const body = await iconDatabase.insertIcon(slug, type, data);
  // return success response
  res.status(200).json({
    type: 'success',
    message: 'Your icon has been added successfully.',
    body,
  });
}

const defaultExport = {
  listIconsJSON,
  getBadge,
  postIcon,
};

export default defaultExport;

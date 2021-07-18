import axios from "axios";
import { Request, Response } from "express";
import iconDatabase from "../services/iconDatabase";

async function getBadge(req: Request, res: Response): Promise<void> {
  const slug = req.query.logo;
  // check that logo was passed
  if (!slug || typeof slug !== "string") {
    res.status(400).json({
      message: "Bad Request: logo parameter not found"
    });
  }
  // check if slug exists
  const item = await iconDatabase.checkSlugExists(slug as string);
  // not found
  if (item === null) {
    res.status(404).json({ message: "Not found.", body: { slug } });
    return;
  }
  // replace logo slug parameter with data url
  const newQuery = req.query;
  newQuery["logo"] = `data:image/${item.type};base64,${item.data}`;
  // build url using request params and query
  const params = Object.values(req.params).join("/");
  const query = Object.keys(newQuery).map(key => `${key}=${encodeURIComponent(req.query[key] as string)}`).join("&");
  const url = `https://img.shields.io/${params}?${query}`;
  // get svg from url with axios
  const svg = await axios.get(url);
  // send svg with 200 response
  res.status(200).contentType("image/svg+xml").send(svg.data);
}

async function postIcon(req: Request, res: Response): Promise<void> {
  const { slug, type, data } = req.body;
  if (!slug || !type || !data) {
    res.status(400).json({ message: "Bad request.", body: { slug, type, data } });
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
      message: "Your icon has been added successfully!",
      body,
    });
    return;
  }
  console.log(`Slug is already in use`);
  // slug already exists
  res.status(409).json({
    message: "This slug is already in use.",
    body: { slug, type, data },
  });
}

const defaultExport = {
  getBadge,
  postIcon
};

export default defaultExport;
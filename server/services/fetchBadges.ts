import axios, { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ParsedQs } from 'qs';
import setLogoColor from './setLogoColor';

/**
 * Error class for exceptions caused during building and fetching of badges
 */
class BadgeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadgeError';
    Object.setPrototypeOf(this, BadgeError.prototype);
  }
}

/**
 * Build query string from ParsedQs
 * @param {ParsedQs} parsedQs query string possibly with replacements
 * @returns {string} query string
 */
function buildQueryString(parsedQs: ParsedQs): string {
  return Object.keys(parsedQs).map((key) => `${key}=${encodeURIComponent(parsedQs[key] as string)}`).join('&');
}

/**
 * Replace logo in query string
 * @param {Request} req request object
 * @param {string} type type of the logo
 * @param {string} data data of the logo
 * @returns {ParsedQs} parsed query string with replaced logo
 */
function replacedLogoQuery(req: Request, type: string, data: string): ParsedQs {
  // replace logo slug parameter with data url
  const { query } = req;
  query.logo = `data:image/${type};base64,${data}`;
  return query;
}

/**
 * Build query string from request and item
 * @param {Request} req request object
 * @param {Object} item data about the icon or null if not found
 * @returns {string} query string
*/
function buildQueryStringFromItem(
  req: Request, item: { slug: string, type: string, data: string } | null,
): string {
  // if item not found build query string from request params
  if (item === null) {
    return buildQueryString(req.query);
  }
  let { data } = item;
  // check for logoColor parameter if it is SVG
  if (typeof req.query.logoColor === 'string' && item.type === 'svg+xml') {
    const color = req.query.logoColor;
    data = setLogoColor(data, color);
  }
  // replace logo with data url in query
  const newQuery = replacedLogoQuery(req, item.type, data);
  // remove "host" parameter from query string
  delete newQuery.host;
  // build url using request params and query
  return buildQueryString(newQuery);
}

/**
 * Validate hostname is allowed
 * @param {string|null} host hostname to validate
 * @returns {boolean} True if host is valid, otherwise false
 */
function validHost(host: string): boolean {
  const validHosts = [
    'img.shields.io',
    'staging.shields.io',
    'formatted-dynamic-badges.herokuapp.com',
  ];
  return validHosts.includes(host);
}

/**
 * Build a badge URL given the slug
 * @param {Request} req request object
 * @param {Object} item data about the icon or null if not found
 * @returns {string} url to badge
 */
function getBadgeUrl(
  req: Request, item: { slug: string, type: string, data: string } | null,
): string {
  // build url using request params and query
  const params = Object.values(req.params).map((p) => encodeURIComponent(p)).join('/');
  const queryString = buildQueryStringFromItem(req, item);
  const host = typeof req.query.host === 'string' ? req.query.host : 'img.shields.io';
  if (!validHost(host)) {
    throw new BadgeError('invalid host');
  }
  return `https://${host}/${params}?${queryString}`;
}

/**
 * Fetch badge from shields.io for item with same params as request
 * @param {Request} req request object
 * @param {Object} item data about the icon or null if not found
 * @returns {AxiosResponse} response from shields.io
 */
function fetchBadgeFromRequest(
  req: Request, item: { slug: string, type: string, data: string } | null,
): Promise<AxiosResponse<string>> {
  // get shields url
  const url = getBadgeUrl(req, item);
  // get badge from url
  return axios.get(url, { validateStatus: () => true });
}

/**
 * Fetch badge from shields.io given just a slug
 * @param {string} slug slug of the icon
 * @returns {AxiosResponse} response from shields.io
 */
function fetchDefaultBadge(slug: string): Promise<AxiosResponse<string>> {
  // get shields url
  const url = `https://img.shields.io/badge/-test-blue?logo=${slug}`;
  // get badge from url
  return axios.get(url, { validateStatus: () => true });
}

/**
 * Fetch badge from shields.io that displays an error message
 * @param {string} message message to display
 * @returns {AxiosResponse} response from shields.io
 */
function fetchErrorBadge(message: string): Promise<AxiosResponse<string>> {
  const encodedMessage = encodeURIComponent(message);
  // get shields url
  const url = `https://img.shields.io/static/v1?label=custom-icon-badges&message=${encodedMessage}&color=red`;
  // get badge from url
  return axios.get(url, { validateStatus: () => true });
}

export {
  BadgeError,
  fetchBadgeFromRequest,
  fetchDefaultBadge,
  fetchErrorBadge,
};

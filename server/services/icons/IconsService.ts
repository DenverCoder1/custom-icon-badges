abstract class IconsService {
  /**
   * Get an icon by slug
   *
   * @param slug The slug of the icon to get
   * @param color The color to set in the SVG or null to use default
   */
  // eslint-disable-next-line no-unused-vars
  public static async getIcon(slug: string, color: string|null = null):
    Promise<{ slug: string; type: string; data: string } | null> {
    throw new Error('Not implemented');
  }
}

export default IconsService;

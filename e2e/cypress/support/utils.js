export const getResourceIdFromUrl = (url) => {
  /**
   * Resource ID number, used for creating
   * ratings via API.
   */

  return url.pathname.replaceAll("/", "");
};

export const getResourceTypePlural = (resourceType) => {
  /**
   * Returns the plural form of any resource type.
   * Used for url creation.
   */

  return resourceType === "motivational-speech"
    ? `${resourceType}es`
    : `${resourceType}s`;
};

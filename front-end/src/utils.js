export const getUrlSearchParam = (param) => {
  return new URLSearchParams(window.location.search).get(param);
};

export const getResourceTypeData = (resourceType, resourceTypeData) => {
  const resourceTypePlural = getResourceTypePlural(resourceType);
  if (!JSON.parse(localStorage.getItem(`/${resourceTypePlural}`))) {
    localStorage.setItem(
      `/${resourceTypePlural}`,
      JSON.stringify(resourceTypeData)
    );
  }
  return JSON.parse(localStorage.getItem(`/${resourceTypePlural}`));
};

export const saveResourcesData = (
  resourceType,
  newResourceData,
  resourceTypeData
) => {
  const resourceTypePlural = getResourceTypePlural(resourceType);
  const newResourcesData = [newResourceData].concat(resourceTypeData);
  localStorage.setItem(
    `/${resourceTypePlural}`,
    JSON.stringify(newResourcesData)
  );
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

export const getResourceValues = (props) => {
  /**
   * Returns a list with all present values
   * from a resource.
   */

  const values = [
    props.resource.value_one,
    props.resource.value_two,
    props.resource.value_three,
  ];

  return values;
};

export const getPopulatedValues = (values) => {
  /**
   * Returns non-empty values.
   */

  return values.filter((value) => {
    return value && value.length > 1;
  });
};

export const cleanLocPath = (locPath) => {
  /**
   * Remove leading and trailing slashes from
   * location.pathname.
   */

  if (locPath === "/") return "home";
  return locPath.replaceAll("/", "");
};

export const getEmbedYoutubeUrl = (resource) => {
  /**
   * Returns a embed-abled URL from resource's
   * youtube url in order to show play in iframe.
   */

  let youtubeUrl = resource.get_youtube_url;
  let embedYoutubeUrl;

  try {
    const urlObj = new URL(youtubeUrl);
    const urlOriginSection = urlObj["origin"];
    const embedSection = "/embed/";
    const videoIdSection = urlObj["searchParams"].get("v");

    embedYoutubeUrl = urlOriginSection + embedSection + videoIdSection;
  } catch (err) {
    const fallback = "https://www.youtube.com/embed/YxZsXZeFU1A";
    embedYoutubeUrl = fallback;
  }
  return embedYoutubeUrl;
};

export const isValidISBN = (str) => {
  /**
   * Checks ISBN validity on add book resource forms.
   * Cortesy of derek-kurth: https://stackoverflow.com/a/23161438
   */

  let sum, weight, digit, check, i;

  str = str.replace(/[^0-9X]/gi, "");

  if (str.length != 10 && str.length != 13) {
    return false;
  }

  if (str.length == 13) {
    sum = 0;
    for (i = 0; i < 12; i++) {
      digit = parseInt(str[i]);
      if (i % 2 == 1) {
        sum += 3 * digit;
      } else {
        sum += digit;
      }
    }
    check = (10 - (sum % 10)) % 10;
    return check == str[str.length - 1];
  }

  if (str.length == 10) {
    weight = 10;
    sum = 0;
    for (i = 0; i < 9; i++) {
      digit = parseInt(str[i]);
      sum += weight * digit;
      weight--;
    }
    check = (11 - (sum % 11)) % 11;
    if (check == 10) {
      check = "X";
    }
    return check == str[str.length - 1].toUpperCase();
  }
};

export const isValidUrl = (str) => {
  /**
   * For use in add resource forms.
   */
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
};

export class Validator {
  constructor() {
    this.validationPassed = true;
    this.errors = new Set();
  }

  validate() {
    if (this.validationPassed) {
      console.log("Validation passed!");
      return true;
    } else {
      console.log("Validation failed!");
      console.log("Errors: ");
      for (let error of this.errors) {
        console.log(error);
      }
      return false;
    }
  }

  registerError(error) {
    this.validationPassed = false;
    this.errors.add(error);
  }

  registerTitle(title, setTitleError) {
    const titleEmptyError = "Title cannot be empty!";
    if (!title) {
      setTitleError(titleEmptyError);
      this.registerError(titleEmptyError);
    } else {
      setTitleError("");
    }
  }

  registerAuthor(author, setAuthorError) {
    const authorEmptyError = "Author cannot be empty!";
    if (!author) {
      this.registerError(authorEmptyError);
      setAuthorError(authorEmptyError);
    } else {
      setAuthorError("");
    }
  }

  registerImageUrl(imageUrl, setImageUrlError) {
    const imageUrlEmptyError = "Image URL cannot be empty!";
    const imageUrlInvalidError = "Image URL has to be a valid url!";

    if (!imageUrl) {
      setImageUrlError(imageUrlEmptyError);
      this.registerError(imageUrlEmptyError);
    } else if (!isValidUrl(imageUrl)) {
      setImageUrlError(imageUrlInvalidError);
      this.registerError(imageUrlInvalidError);
    } else {
      setImageUrlError("");
      return true;
    }
  }

  registerSubtitle(subtitle, setSubtitleError) {
    const subtitleEmptyError = "Subtitle cannot be empty!";
    if (!subtitle) {
      setSubtitleError(subtitleEmptyError);
      this.registerError(subtitleEmptyError);
    } else {
      setSubtitleError("");
    }
  }

  registerISBN(isbn, setISBNError) {
    const ISBNEmptyError = "ISBN cannot be empty!";
    const ISBNInvalidError = "ISBN has to be a 13 digits!";

    if (!isbn) {
      setISBNError(ISBNEmptyError);
      this.registerError(ISBNEmptyError);
    } else if (!isValidISBN(isbn)) {
      setISBNError(ISBNInvalidError);
      this.registerError(ISBNInvalidError);
    } else {
      setISBNError("");
    }
  }

  registerWebsiteUrl(websiteUrl, setWebsiteUrlError) {
    const websiteUrlEmptyError = "Website URL cannot be empty!";
    const websiteUrlInvalidError = "Website URL has to be a valid url!";

    if (!websiteUrl) {
      setWebsiteUrlError(websiteUrlEmptyError);
      this.registerError(websiteUrlEmptyError);
    } else if (!isValidUrl(websiteUrl)) {
      setWebsiteUrlError(websiteUrlInvalidError);
      this.registerError(websiteUrlInvalidError);
    } else {
      setWebsiteUrlError("");
    }
  }

  registerYoutubePageUrl(youtubePageUrl, setYoutubePageUrlError) {
    const youtubePageUrlEmptyError = "Youtube URL cannot be empty!";
    const youtubePageUrlInvalidError = "Youtube URL has to be a valid url!";

    if (!youtubePageUrl) {
      setYoutubePageUrlError(youtubePageUrlEmptyError);
      this.registerError(youtubePageUrlEmptyError);
    } else if (!isValidUrl(youtubePageUrl)) {
      setYoutubePageUrlError(youtubePageUrlInvalidError);
      this.registerError(youtubePageUrlInvalidError);
    } else {
      setYoutubePageUrlError("");
    }
  }

  registerSpotifyPageUrl(spotifyPageUrl, setSpotifyPageUrlError) {
    const spotifyPageUrlEmptyError = "Spotify URL cannot be empty!";
    const spotifyPageUrlInvalidError = "Spotify URL has to be a valid url!";

    if (!spotifyPageUrl) {
      setSpotifyPageUrlError(spotifyPageUrlEmptyError);
      this.registerError(spotifyPageUrlEmptyError);
    } else if (!isValidUrl(spotifyPageUrl)) {
      setSpotifyPageUrlError(spotifyPageUrlInvalidError);
      this.registerError(spotifyPageUrlInvalidError);
    } else {
      setSpotifyPageUrlError("");
    }
  }

  registerPodcast(podcast, setPodcastError) {
    const podcastEmptyError = "Podcast cannot be empty!";
    if (!podcast) {
      setPodcastError(podcastEmptyError);
      this.registerError(podcastEmptyError);
    } else {
      setPodcastError("");
    }
  }

  registerYoutubeEpisodeUrl(youtubeEpisodeUrl, setYoutubeEpisodeUrlError) {
    const youtubeEpisodeUrlEmptyError = "Youtube episode URL cannot be empty!";
    const youtubeEpisodeUrlInvalidError =
      "Youtube episode URL has to be a valid url!";

    if (!youtubeEpisodeUrl) {
      setYoutubeEpisodeUrlError(youtubeEpisodeUrlEmptyError);
      this.registerError(youtubeEpisodeUrlEmptyError);
    } else if (!isValidUrl(youtubeEpisodeUrl)) {
      setYoutubeEpisodeUrlError(youtubeEpisodeUrlInvalidError);
      this.registerError(youtubeEpisodeUrlInvalidError);
    } else {
      setYoutubeEpisodeUrlError("");
    }
  }

  registerSpotifyEpisodeUrl(spotifyEpisodeUrl, setSpotifyEpisodeUrlError) {
    const spotifyEpisodeUrlEmptyError = "Spotify episode URL cannot be empty!";
    const spotifyEpisodeUrlInvalidError =
      "Spotify episode URL has to be a valid url!";

    if (!spotifyEpisodeUrl) {
      setSpotifyEpisodeUrlError(spotifyEpisodeUrlEmptyError);
      this.registerError(spotifyEpisodeUrlEmptyError);
    } else if (!isValidUrl(spotifyEpisodeUrl)) {
      setSpotifyEpisodeUrlError(spotifyEpisodeUrlInvalidError);
      this.registerError(spotifyEpisodeUrlInvalidError);
    } else {
      setSpotifyEpisodeUrlError("");
    }
  }

  registerYoutubeUrl(youtubeUrl, setYoutubeUrlError) {
    const youtubeUrlEmptyError = "Youtube URL cannot be empty!";
    const youtubeUrlInvalidError = "Youtube URL has to be a valid URL!";

    if (!youtubeUrl) {
      setYoutubeUrlError(youtubeUrlEmptyError);
      this.registerError(youtubeUrlEmptyError);
    } else if (!isValidUrl(youtubeUrl)) {
      setYoutubeUrlError(youtubeUrlInvalidError);
      this.registerError(youtubeUrlInvalidError);
    } else {
      setYoutubeUrlError("");
      return true;
    }
  }
}

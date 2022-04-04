export function isValidIsbn(str) {
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
}

export function isValidUrl(str) {
  /**
   * For use in add resource forms.
   */
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function getEmbedYoutubeUrl(resource) {
  /**
   * Get url embed-abled URL from resource's
   * youtube url in order to show in iframe.
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
}

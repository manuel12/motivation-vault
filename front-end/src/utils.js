export function isValidIsbn(str) {
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

export function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function getYoutubeURL(resource, fallback) {
  return resource.get_youtube_url &&
    resource.get_youtube_url.includes("/watch?")
    ? resource.get_youtube_url
    : fallback;
}

export function getEmbedYoutubeURL(resource, fallback) {
  console.log(resource)
  let url = resource.get_youtube_url;
  
  try {
    if (!url.includes("embed")) {
      const tempUrl = new URL(url);
      const origin = tempUrl["origin"];
      const embedStr = "/embed/";
      const videoId = tempUrl["searchParams"].get("v");
  
      url = origin + embedStr + videoId;
    }
  } catch(err) {
    url = fallback;
  }

  console.log(`Returning ${url} for resource ${resource}`)
  return url;
}

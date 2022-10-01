import { getResourceTypePlural } from "./utils";

const _fetch = (url, token) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

const _send = (url, token, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const _update = (url, token, data) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const _delete = (url, token) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export class API {
  static loginUser(credentials) {
    return fetch(`/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(error));
  }

  static registerUser(credentials) {
    return fetch(`/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((resp) => resp.json());
  }

  static isValidToken(token, callback) {
    _fetch(`/api/`, token)
      .then((resp) => resp.status === 200)
      .then(callback);
  }

  static _clearInvalidToken(resp) {
    if (resp.detail === "Invalid token.") {
      delete localStorage.token;
      window.location.href = "/";
    } else {
      return resp;
    }
  }

  static fetchAllResources(token, setResourceFunc) {
    _fetch(`/api/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchAllResourcesOfType(resourceType, token, setResourceFunc) {
    _fetch(`/api/${resourceType}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchResource(id, token, setResourceFunc) {
    return _fetch(`/api/${id}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => {
        setResourceFunc(resp);
        return resp;
      })
      .catch((error) => console.error(error));
  }

  static fetchResourceOfType(resourceType, id, token, setResourceFunc) {
    resourceType = getResourceTypePlural(resourceType);

    return _fetch(`/api/${resourceType}/${id}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => {
        setResourceFunc(resp);
        return resp;
      })
      .catch((error) => console.error(error));
  }

  static getPodcastsAvailable(setPodcastAvailableFunc) {
    fetch(`/api/podcasts/`)
      .then((resp) => resp.json())
      .then((resp) => {
        setPodcastAvailableFunc(resp.length > 0);
      });
  }

  static getPodcastsTitlesAndIds(setPodcastTitlesAndIdsFunc) {
    fetch("/api/podcasts/")
      .then((resp) => resp.json())
      .then((resp) =>
        resp.map((podcast) => {
          return { title: podcast.title, id: podcast.id };
        })
      )
      .then((resp) => setPodcastTitlesAndIdsFunc(resp));
  }

  static createResource(resourceType, token, resourceData) {
    resourceType = getResourceTypePlural(resourceType);

    _send(`/api/${resourceType}/`, token, resourceData)
      .then((resp) => resp.json())
      .then((resp) => {
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  }

  static updateResource(resourceType, id, token, resourceData) {
    resourceType = getResourceTypePlural(resourceType);

    _update(`/api/${resourceType}/${id}/`, token, resourceData)
      .then((resp) => {
        window.location.href = `/${id}/`;
      })
      .catch((error) => console.error(error));
  }

  static deleteResource(resourceType, id, token) {
    resourceType = getResourceTypePlural(resourceType);

    _delete(`/api/${resourceType}/${id}/`, token)
      .then((resp) => {
        console.log(resp);
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  }

  static createComment(token, commentData, callback) {
    _send(`/api/comments/`, token, commentData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }

  static postRating(token, ratingData, callback) {
    _send(`/api/ratings/`, token, ratingData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }
}

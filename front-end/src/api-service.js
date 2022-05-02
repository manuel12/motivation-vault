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

export class API {
  static loginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(error));
  }

  static registerUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static isValidToken(token, callback) {
    _fetch(`http://127.0.0.1:8000/api/`, token)
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
    _fetch("http://127.0.0.1:8000/api/", token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchAllResourcesOfType(resourceType, token, setResourceFunc) {
    _fetch(`http://127.0.0.1:8000/api/${resourceType}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchResource(id, token, setResourceFunc) {
    _fetch(`http://127.0.0.1:8000/api/${id}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static createResource(resourceType, token, resourceData) {
    let url = "http://127.0.0.1:8000/api/";

    if (resourceType === "motivational-speech") {
      url += `${resourceType}es/`;
    } else {
      url += `${resourceType}s/`;
    }
    _send(url, token, resourceData)
      .then((resp) => resp.json())
      .then((resp) => {
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  }

  static createComment(token, commentData, callback) {
    _send(`http://127.0.0.1:8000/api/comments/`, token, commentData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }

  static postRating(token, ratingData, callback) {
    _send(`http://127.0.0.1:8000/api/ratings/`, token, ratingData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }
}

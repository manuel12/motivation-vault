const _fetch = (url, token) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
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
      .catch((error) => console.log(error));
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

  static fetchAllResources(setResourceFunc) {
    return _fetch("http://127.0.0.1:8000/api/")
      .then((resp) => resp.json())
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.log(error));
  }

  static fetchAllResourcesOfType(resourceType, token, setResourceFunc) {
    let url = `http://127.0.0.1:8000/api/${resourceType}/`;
    _fetch(url, token)
      .then((resp) => resp.json())
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.log(error));
  }

  static fetchResource(id, token, setResourceFunc) {
    let url = `http://127.0.0.1:8000/api/${id}/`;
    _fetch(url, token)
      .then((resp) => resp.json())
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.log(error));
  }

  static createResource(options) {
    return fetch(`http://127.0.0.1:8000/api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`,
      },
      body: JSON.stringify(options.body),
    }).then((resp) => resp.json());
  }
}

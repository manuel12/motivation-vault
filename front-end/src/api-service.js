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
        console.log(resp);
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  }
}

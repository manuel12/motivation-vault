export class API {
  static loginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .catch( error => console.log(error))
  }

  static registerUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    }).then( resp => resp.json())
  }

  static fetchResource(options) {
    let url
    if(options.id) {
      url = `http://127.0.0.1:8000/api/${options.id}/`
    } else {
      url =  options.resource == 'home' ? 
        `http://127.0.0.1:8000/api/` :
        `http://127.0.0.1:8000/api/${options.resource}/` 
    }
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Token ${options.token}`
      }
    })
    .then( resp => resp.json())
    .then( resp => options.setResourceFunc(resp)) 
    .catch( error => console.log(error))
  }
}


const ApiManager = {
    get: function (endpoint) {
      return fetch(`http://localhost:8000/${endpoint}`, {
        "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
    },
    getOne: function (endpoint, id) {
      return fetch(`http://localhost:8000/${endpoint}/${id}`, {
        "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
    },
    post: function (endpoint, object) {
      return fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
        },
        body: JSON.stringify(object)
      })
        .then(response => response.json())
    },
    delete: function (endpoint, id) {
      return fetch(`http://localhost:8000/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
        }
      })
    },
    update: function (endpoint, object, id) {
      return fetch(`http://localhost:8000/${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
        },
        body: JSON.stringify(object)
      })
        .then(response => response.json())
    }
  }
  
  
  export default ApiManager
  
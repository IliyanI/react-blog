function makeRequest(url, method, body, options) {
  const response = fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
      authorization: "bearer " + sessionStorage.getItem("user_token")
    },
    body: JSON.stringify(body),
    ...options
  });
  return response;
}

export default {
  get: (url, body, options) => {
    return makeRequest(url, "get", body, options);
  },
  post: (url, body, options) => {
    return makeRequest(url, "post", body, options);
  },
  put: (url, body, options) => {
    return makeRequest(url, "put", body, options);
  },
  delete: (url, body, options) => {
    return makeRequest(url, "delete", body, options);
  }
};

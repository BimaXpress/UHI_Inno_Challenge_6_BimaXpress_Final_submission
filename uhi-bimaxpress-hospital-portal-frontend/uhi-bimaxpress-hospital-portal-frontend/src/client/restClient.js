import fetch from "cross-fetch";
import queryString from "query-string";

export default class RestClient {
  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getConfig(method, data) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }
    return config;
  }

  returnStatusAndJson = (response) =>
    response
      .json()
      .then((json) => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }));

  returnStatusAndBlob = (response) =>
    response
      .blob()
      .then((blob) => {
        return { status: response.status, blob };
      })
      .catch((err) => {
        return { status: response.status, err };
      });

  static returnStatusAndJsonStatic = (response) =>
    response
      .json()
      .then((json) => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }));

  get(endpoint, filter, cookie) {
    return fetch(
      `${this.baseUrl}${endpoint}?${queryString.stringify(filter)}`,
      this.getConfig("get", null, cookie)
    ).then(this.returnStatusAndJson);
  }

  post(endpoint, data) {
    return fetch(this.baseUrl + endpoint, this.getConfig("post", data)).then(
      this.returnStatusAndJson
    );
  }

  postFormData(endpoint, formData) {
    return fetch(
      this.baseUrl + endpoint,
      this.postFormDataConfig(formData)
    ).then(this.returnStatusAndJson);
  }

  put(endpoint, data) {
    return fetch(this.baseUrl + endpoint, this.getConfig("put", data)).then(
      this.returnStatusAndJson
    );
  }

  delete(endpoint, data) {
    return fetch(this.baseUrl + endpoint, this.getConfig("delete", data)).then(
      this.returnStatusAndJson
    );
  }

  getBlobData(endpoint, data) {
    return fetch(
      `${this.baseUrl}${endpoint}?${queryString.stringify(data)}`,
      this.getBlobDataConfig(data)
    ).then(this.returnStatusAndBlob);
  }

  getBlobDataByPost(endpoint, data) {
    return fetch(
      `${this.baseUrl}${endpoint}`,
      this.getBlobDataConfigByPost(data)
    ).then(this.returnStatusAndBlob);
  }

  getBlobDataByPost(endpoint, data) {
    return fetch(
      `${this.baseUrl}${endpoint}`,
      this.getBlobDataConfigByPost(data)
    ).then(this.returnStatusAndBlob);
  }
}



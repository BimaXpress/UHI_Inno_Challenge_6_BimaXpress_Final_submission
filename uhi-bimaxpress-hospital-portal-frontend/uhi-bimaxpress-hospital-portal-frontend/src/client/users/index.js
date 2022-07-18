export default class Users {
  constructor(client) {
    this.client = client;
    this.resourceUrl = "/users";
  }

  list(role) {
    return this.client.get(`${this.resourceUrl}/${role}`);
  }

  retrieve(id, filter) {
    return this.client.get(`${this.resourceUrl}/${id}`, filter);
  }

  create(data) {
    return this.client.post(this.resourceUrl, data);
  }

  update(id, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data);
  }

  delete(id) {
    return this.client.delete(`${this.resourceUrl}/${id}`);
  }
}

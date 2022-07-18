import apiConstants from "../../utils/apiConstants";

export default class Auth {
  constructor(client) {
    this.client = client;
    //this.resourceUrl = "/cabReviewSummary";
    this.resourceUrl = "";
  }

  // list(filter) {
  //     return this.client.get(`${this.resourceUrl}/1`)
  // }

  assign(data) {
    return this.client.post(`${this.resourceUrl}/signin`, data);
  }

  // update(data) {
  //   return this.client.put(`${this.resourceUrl}/cabreview/discussed`, data);
  // }

  // create(data) {
  //   return this.client.post(`${this.resourceUrl}/cabreview/discussed`, data);
  // }
}

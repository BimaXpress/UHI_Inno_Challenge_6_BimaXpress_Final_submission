import ApiClient from "./apiClient";

import NewCase from "./newcase";
import Users from "./users";
import Auth from "./auth";

export default class Client {
  constructor(options = {}) {
    this.apiBaseUrl = options.apiBaseUrl;
    this.apiToken = options.apiToken;

    const apiClient = new ApiClient({
      baseUrl: this.apiBaseUrl,
      token: this.apiToken,
    });

    this.newcase = new NewCase(apiClient);
    this.users = new Users(apiClient);
    this.auth = new Auth(apiClient);
  }

  static authorize = (baseUrl, email) => ApiClient.authorize(baseUrl, email);
}

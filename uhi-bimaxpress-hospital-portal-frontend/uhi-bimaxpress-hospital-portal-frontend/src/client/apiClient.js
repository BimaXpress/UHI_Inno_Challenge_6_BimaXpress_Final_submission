import fetch from "cross-fetch";
import RestClient from "./restClient";

export default class ApiClient extends RestClient {
  static authorize = (baseUrl, email) => {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    return fetch(`${baseUrl}/authorize`, config).then(
      RestClient.returnStatusAndJson
    );
  };

  getToken() {
    if (this.token == null) {
      if (localStorage.getItem("accessToken")) {
        return localStorage.getItem("accessToken");
      } else {
        return null;
      }
    } else {
      return this.token;
    }
  }

  getConfig(method, data, cookie) {
    let config = {};
    let token = this.getToken();
    if (token) {
      config = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      config = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (cookie) {
      config.headers.Cookie = cookie;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }
    return config;
  }

  getCredentialsConfig(baseUrl) {
    const includePrefix =
      baseUrl.includes("http://") || baseUrl.includes("https://");
    return includePrefix ? "include" : "same-origin";
  }

  postFormDataConfig = (formData) => {
    let config = {};
    let token = this.getToken();
    if (token) {
      config = {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      config = {
        method: "post",
        body: formData,
      };
    }
    return config;
  };

  getBlobDataConfig() {
    let config = {};
    let token = this.getToken();
    if (token) {
      config = {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      config = {
        method: "get",
      };
    }
    return config;
  }

  getBlobDataConfigByPost(data) {
    let config = {};
    let token = this.getToken();
    if (token) {
      config = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      config = {
        method: "post",
      };
    }
    if (data) {
      config.body = JSON.stringify(data);
    }
    return config;
  }
}

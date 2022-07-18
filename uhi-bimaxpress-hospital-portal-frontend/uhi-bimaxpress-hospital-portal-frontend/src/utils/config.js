const config = {
  apiBaseUrl: '',
  oidc: {
    clientId: window.CLIENT_ID,
    issuer: window.ISSUER,
    redirectUri: window.REDIRECT_URI,
  },
  sessionTimeout: 1800000,
};
export default config;

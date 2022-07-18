import client from '../client';
import config from './config';

const api = new client({
  apiBaseUrl: config.apiBaseUrl,
});

export default api;

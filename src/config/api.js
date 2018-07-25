const BASE_URL = 'http://localhost:3000/api/v1';

export default {
  BASE_URL,
  endpoints: {
    TOKEN: 'oauth2/token',
  },
  credentials: {
    CLIENT_ID: '5b55716cc12d0d81032a6a2f',
    CLIENT_SECRET: '$2a$10$4Ohfkh9/yieS1qlHk4pT5uCYvUuKSpZXarE9W3KmUFHVS4g7Y1vh2',
    grantTypes: {
      PASSWORD: 'password',
      REFRESH_TOKEN: 'refresh_token',
    },
  },
  url(endpoint) {
    return `${BASE_URL}/${endpoint}`;
  },
};

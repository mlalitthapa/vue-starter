import actions from '@/config/actions';
import Api from '@/config/api';
import mutations from '@/config/mutations';
import axios from '@/http';
import store from '@/store';

export default {
  login(username, password) {
    return axios.post(Api.url(Api.endpoints.TOKEN), {
      grant_type: Api.credentials.grantTypes.PASSWORD,
      client_id: Api.credentials.CLIENT_ID,
      client_secret: Api.credentials.CLIENT_SECRET,
      username,
      password,
    });
  },

  setToken(token) {
    if (!token) localStorage.clear();
    else localStorage.setItem('token', JSON.stringify(token));
  },

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    store.commit(mutations.auth.SET_TOKEN, token);
    return token;
  },

  isLoggedIn() {
    const token = this.getToken();
    if (!token || this.hasTokenExpired(token)) {
      this.setToken();
      return false;
    }
    if (this.isTokenExpiring(token)) this.refreshToken(token);
    return true;
  },

  isTokenExpiring(token) {
    const tokenLifetime = token.expires_in;
    return (tokenLifetime - this.getTokenAge(token)) < 60;
  },

  hasTokenExpired(token) {
    const tokenLifetime = token.expires_in;
    return (tokenLifetime - this.getTokenAge(token)) < 0;
  },

  getTokenAge(token) {
    const currentDate = Date.now();
    return (currentDate - token.created_at) / 1000;
  },

  refreshToken(token) {
    axios.post(
      Api.url(Api.endpoints.TOKEN),
      {
        grant_type: Api.credentials.grantTypes.REFRESH_TOKEN,
        client_id: Api.credentials.CLIENT_ID,
        client_secret: Api.credentials.CLIENT_SECRET,
        refresh_token: token.refresh_token,
      },
    ).then(({ data: newToken }) => store.dispatch(actions.auth.LOGGED_IN, newToken))
      .catch(console.log);
  },

};

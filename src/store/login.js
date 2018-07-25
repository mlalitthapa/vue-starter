import actions from '@/config/actions';
import mutations from '@/config/mutations';
import AuthService from '@/service/auth/authService';

const LOGIN_ACTIONS = actions.auth;
const MUTATIONS = mutations.auth;

export default {
  state: {
    token: null,
  },
  mutations: {
    [MUTATIONS.SET_TOKEN](state, payload) {
      // eslint-disable-next-line
      state.token = payload;
    },
  },
  actions: {
    [LOGIN_ACTIONS.LOGIN](context, { username, password }) {
      return AuthService.login(username, password);
    },
    [LOGIN_ACTIONS.LOGGED_IN]({ commit }, token) {
      const accessToken = Object.assign({
        created_at: Date.now(),
      }, token);
      commit(MUTATIONS.SET_TOKEN, accessToken);
      AuthService.setToken(accessToken);
    },
    [LOGIN_ACTIONS.LOGOUT]({ commit }) {
      commit(MUTATIONS.SET_TOKEN, null);
      AuthService.setToken(null);
    },
  },
};

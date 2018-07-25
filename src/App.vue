<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <span v-if="!loggedIn">
                <router-link to="/login">Login</router-link>
            |
            </span>
            <router-link to="/dashboard">Dashboard</router-link>
            <span v-if="loggedIn">
                 | <a href="#" @click="signOut">Logout</a>
            </span>
        </div>
        <router-view/>
    </div>
</template>

<script>
import actions from '@/config/actions';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
    loggedIn() {
      return Boolean(this.token);
    },
  },
  methods: {
    ...mapActions([
      actions.auth.LOGOUT,
    ]),
    signOut() {
      this[actions.auth.LOGOUT]();
      this.$router.push('/login');
    },
  },
};
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>

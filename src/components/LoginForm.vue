<template>
    <form @submit="handleLogin">
        <p v-if="errors">{{errors}}</p>
        <div>
            <label>
                Username: <input type="text" placeholder="Username" v-model="username" required>
            </label>
        </div>
        <div>
            <label>
                Password: <input type="password" placeholder="Password" v-model="password" required>
            </label>
        </div>
        <button type="submit" :disabled="processing">Login</button>
    </form>
</template>

<script>
import actions from '@/config/actions';
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      processing: false,
      errors: null,
    };
  },
  computed: {
    payload() {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },
  methods: {
    ...mapActions([
      actions.auth.LOGIN,
      actions.auth.LOGGED_IN,
    ]),
    handleLogin() {
      this.processing = true;
      this[actions.auth.LOGIN](this.payload)
        .then(({ data: token }) => {
          this.errors = null;
          this.processing = false;
          this[actions.auth.LOGGED_IN](token);
          this.$router.push('/dashboard');
        })
        .catch(({ response }) => {
          this.processing = false;
          this.errors = response ? response.data.error_description : 'Something went wrong.';
        });
    },
  },
};
</script>

<style scoped>

</style>

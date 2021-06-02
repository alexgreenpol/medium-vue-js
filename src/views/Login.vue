<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">Need an account?</router-link>
          </p>
          <md-validationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>

            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="disabled"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'MdLogin',
  components: {
    MdValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      disabled: false
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }
  },
  methods: {
    onSubmit() {
      this.disabled = true;

      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(user => {
          this.disabled = false;
          console.log('Successfully login user', user);
          this.$router.push({name: 'home'});
        })
        .catch(() => {
          this.disabled = false;
        });
    }
  }
};
</script>

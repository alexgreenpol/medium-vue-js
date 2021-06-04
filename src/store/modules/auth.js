import authApi from '@/api/auth';
import {setItem} from '@/helpers/presistanceStorage';

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure'
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser'
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
};

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.validationErrors = null;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoggedIn = false;
  }
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
          console.error('Error', result);
          reject();
        });
    });
  },

  [actionTypes.login](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
          console.error('Error', result);
          reject();
        });
    });
  },

  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.getCurrentUserFailure,
            result.response.data.errors
          );
          console.error('Error', result);
          reject();
        });
    });
  }
};

const getters = {
  [getterTypes.currentUser](state) {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn](state) {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous](state) {
    return state.isLoggedIn === false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

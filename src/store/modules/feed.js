import feedApi from '@/api/feed';

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure'
};

export const actionTypes = {
  getFeed: '[feed] Get feed'
};

const state = {
  data: null,
  isLoading: false,
  errors: false
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getFeedStart);
      feedApi
        .feed(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(result => {
          context.commit(mutationTypes.getFeedFailure);

          reject(result);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};

// https://api.iextrading.com/1.0/ref-data/symbols

import axios from 'axios';

export const state = () => ({
  all: null,
});

export const getters = {
  allCorps(state, { from, to }) {
    return state.all;
  },
};

export const actions = {
  async fetch({ commit }) {
    const response = await axios
      .get(`https://api.iextrading.com/1.0/ref-data/symbols`)
      .then(response => response.data)
      .catch(e => {
        console.log(e);
      });

    commit('setCorps', response);
  },
};

export const mutations = {
  setCorps(state, obj) {
    state.all = obj;
  },
};

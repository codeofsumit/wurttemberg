import axios from 'axios';

export const state = () => ({
  exchange: {},
});

export const getters = {
  exchangeRate(state, { from, to }) {
    return state.exchange['5. Exchange Rate'];
  },
};

const apiBase = 'https://www.alphavantage.co';
const apiFunc = 'CURRENCY_EXCHANGE_RATE';
const apiKey = 'NOA815YG87R4EV31';

export const actions = {
  async fetch({ commit }, { from, to }) {
    const response = await axios
      .get(
        `${apiBase}/query?function=${apiFunc}&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`,
      )
      .then(response => response.data['Realtime Currency Exchange Rate'])
      .catch(e => {
        console.log(e);
      });

    commit('setCurrencyExchange', response);
  },
};

export const mutations = {
  setCurrencyExchange(state, obj) {
    state.exchange = obj;
  },
};

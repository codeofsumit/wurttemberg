import axios from 'axios';

export const state = () => ({
  quotes: null,
});

export const getters = {
  stockQuotes(state) {
    return state.quotes;
  },
};

const apiBase = 'https://www.alphavantage.co';
const apiFunc = 'BATCH_STOCK_QUOTES';
const apiKey = 'NOA815YG87R4EV31';

export const actions = {
  async fetch({ commit }, symbols) {
    const stock = await axios
      .get(
        `${apiBase}/query?function=${apiFunc}&symbols=${symbols.join(
          ',',
        )}&apikey=${apiKey}`,
      )
      .then(response => response.data['Stock Quotes'])
      .catch(e => {
        console.log(e);
      });

    commit('setStock', stock);
  },
};

export const mutations = {
  setStock(state, stock) {
    state.quotes = stock;
  },
};

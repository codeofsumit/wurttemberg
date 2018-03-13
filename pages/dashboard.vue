<template>
  <section class="section">
    <div class="container">
      <h2 class="subtitle">Portfolio</h2>
      <hr>
      <table class="table is-fullwidth" v-if="stockQuotes && exchangeRate && allCorps">
        <thead>
          <tr>
            <th>Firma</th>
            <th class="has-text-right">Aktien</th>
            <th class="has-text-right">Kaufwert</th>
            <th class="has-text-right">Aktueller Wert</th>
            <th class="has-text-right">Änderung</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(corp, i) in portfolio" :key="i">
            <td>
              <p>{{companyName(corp.symbol)}}</p>
              <p>{{corp.symbol}}</p>
            </td>
            <td class="has-text-right">{{corp.amount}}</td>
            <td class="has-text-right">
              <p class="price">
                <span>{{buyRate(corp.buyRate)}} €</span>
              </p>
              <p class="price">
                <span>
                  {{initialValue(corp.buyRate, corp.amount)}} €
                </span>
              </p>
            </td>
            <td class="has-text-right">
              <p class="price">
                <span>
                  {{currentPrice(corp.symbol)}} €
                </span>
              </p>
              <p class="price">
                <span>
                  {{totalValue(corp.symbol, corp.amount)}} €
                </span>
              </p>
            </td>
            <td class="has-text-right">
              <span>
                {{valueChange(corp)}} %
              </span>
              <span v-if="valueChange(corp) > 0">
                <i class="fas fa-arrow-alt-circle-up has-text-success" data-fa-transform="rotate-45"></i>
              </span>
              <span v-if="valueChange(corp) < 0">
                <i class="fas fa-arrow-alt-circle-up has-text-danger" data-fa-transform="rotate-135"></i>
              </span>
              <span v-if="valueChange(corp) === 0">
                <i class="fas fa-arrow-alt-circle-up has-text-warning" data-fa-transform="rotate-90"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <AddCorpForm></AddCorpForm>
    </div>
  </section>
</template>

<script>
import { find, round, map } from 'lodash';
import { mapGetters } from 'vuex';
import AddCorpForm from '@/components/AddCorpForm';

export default {
  data() {
    return {
      portfolio: [
        {
          symbol: 'AAPL',
          amount: 3.0,
          buyRate: 124.92,
          buyDate: '2018-02-16',
        },
        {
          symbol: 'TSLA',
          amount: 4.0,
          buyRate: 296.0875,
          buyDate: '2017-06-16',
        },
        {
          symbol: 'DIS',
          amount: 2.0,
          buyRate: 95.0,
          buyDate: '2017-12-18',
        },
        {
          symbol: 'MSFT',
          amount: 19,
          buyRate: 53.10579,
          buyDate: '2017-01-27',
        },
        {
          symbol: 'PYPL',
          amount: 5.0,
          buyRate: 45.036,
          buyDate: '2018-01-31',
        },
        {
          symbol: 'NFLX',
          amount: 4.0,
          buyRate: 193.69,
          buyDate: '2018-02-16',
        },
        // {
        //   symbol: 'DMLRY',
        //   amount: 6.0,
        //   buyRate: 61.855,
        //   buyDate: '2016-09-29',
        // },
        // {
        //   symbol: 'NTO',
        //   amount: 2.0,
        //   buyRate: 276.975,
        //   buyDate: '2018-03-07',
        // },
        {
          symbol: 'AMZN',
          amount: 1.0,
          buyRate: 888.05,
          buyDate: '2017-06-16',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('stock', ['stockQuotes']),
    ...mapGetters('currency', ['exchangeRate']),
    ...mapGetters('corps', ['allCorps']),
  },
  methods: {
    companyName(symbol) {
      return find(this.allCorps, { symbol }).name;
    },
    valueChange({ symbol, buyRate }) {
      const oldValue = buyRate;
      const newValue = this.currentPrice(symbol);
      const delta = newValue - oldValue;
      const change = delta / oldValue;

      return round(change * 100, 2);
    },
    initialValue(buyRate, amount) {
      return round(buyRate * amount, 2);
    },
    totalValue(symbol, amount) {
      return round(this.currentPrice(symbol) * amount, 2);
    },
    buyRate(p) {
      return round(p, 2);
    },
    currentPrice(symbol) {
      const stock = find(this.stockQuotes, { '1. symbol': symbol });
      const priceUSD = parseFloat(stock['2. price'], 10);
      const USDtoEUR = parseFloat(this.exchangeRate, 10);
      const price = round(priceUSD * USDtoEUR, 2);

      return price;
    },
  },
  mounted() {
    const symbols = map(this.portfolio, 'symbol');
    this.$store.dispatch('stock/fetch', symbols);
    this.$store.dispatch('currency/fetch', { from: 'USD', to: 'EUR' });
    this.$store.dispatch('corps/fetch');
  },
  components: {
    AddCorpForm,
  },
};
</script>

<style scoped>

</style>

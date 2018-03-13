<template>
  <div v-if="allCorps">
    <div class="field">
      <p class="control">
        <label for="" class="label">Firma</label>
        <input placeholder="Firmenname" type="text" class="input" v-model="corpSearch">
      </p>
      <div class="results" v-if="corpSearch.length > 0">
        <ul>
          <li v-for="corp in corpResults" :key="corp.symbol">
            <p>{{corp.name}} ({{corp.symbol}})</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="field">
      <p class="control">
        <label for="" class="label">Anzahl</label>
        <input type="text" class="input">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label for="" class="label">Kaufwert</label>
        <input type="text" class="input">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label for="" class="label">Kaufdatum</label>
        <input type="text" class="input">
      </p>
    </div>
  </div>
</template>

<script>
import { take } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      corpSearch: '',
    };
  },
  computed: {
    ...mapGetters('corps', ['allCorps']),
    corpResults() {
      const results = this.allCorps.filter(corp =>
        corp.name.includes(this.corpSearch),
      );
      return take(results, 5);
    },
  },
};
</script>

<style scoped>

</style>

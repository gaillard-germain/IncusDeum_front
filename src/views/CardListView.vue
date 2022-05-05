<template lang="html">
  <div class="card-list">
    <h1>This is the card list page</h1>

    <CardListItem v-for="card in cards" :key="card.id" :card="card"/>

  </div>
</template>

<script>
import axios from 'axios'
import CardListItem from '../components/CardListItem.vue'

export default {
  name: "CardListView",
  components: {
    CardListItem
  },
  data() {
    return {
      cards: null
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/card')
      .then((response) => {
        this.cards = response.data
      })
  }
}
</script>

<style lang="css" scoped>
</style>

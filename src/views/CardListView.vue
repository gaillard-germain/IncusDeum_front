<template lang="html">
  <div class="card-list">
    <h1>This is the card list page</h1>

    <CardListItem v-for="(card, index) in cards" :key="index" :card="card" @showDetail="showCard($event)"/>

  </div>
  <CardDetail ref="showCard" :card="card"></CardDetail>
</template>

<script>
import { API } from '@/services/Api'
import CardListItem from '../components/CardListItem.vue'
import CardDetail from '../components/CardDetail.vue'

export default {
  name: "CardListView",
  components: {
    CardListItem,
    CardDetail
  },
  data() {
    return {
      cards: [],
      card: {
        name: "",
        category: {
          id: 0,
          name: ""
        },
        value: 0,
        frontImage: {
          url: ""
        },
        backImage: {
          url: ""
        },
        color: "",
        description: "",
        fx: []
      },
    }
  },
  mounted() {
    API
      .get('card')
      .then((response) => {
        this.cards = response.data
      })
  },
  methods: {
    async showCard(id) {
      this.getCard(id);
      const ok = await this.$refs.showCard.show()
            if (ok) {
              console.log("Closed");
            } else {
              console.log("Aborted");
            }
    },
    getCard(id) {
      API
      .get('card/' + id)
      .then((response) => {
        this.card = response.data
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

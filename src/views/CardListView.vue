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
import { mapActions } from 'vuex'

export default {
  name: "CardListView",
  components: {
    CardListItem,
    CardDetail
  },
  data() {
    return {
      page: 0,
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
      .get('card', { params: { 'page': this.page } })
      .then((response) => {
        this.cards = response.data
      })
  },
  methods: {
    ...mapActions(['getCard']),
    async showCard(id) {
      this.getCard(id);
      const ok = await this.$refs.showCard.show()
            if (ok) {
              console.log("Closed");
            } else {
              console.log("Aborted");
            }
    },
  }
}
</script>

<style lang="css" scoped>
</style>

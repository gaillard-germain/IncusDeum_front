<template lang="html">
  <div class="card-list">
    <h1>This is the card list page</h1>

    <CardListItem v-for="(card, index) in cards" :key="index" :card="card" @showDetail="showCard($event)"/>

  </div>
  <div class="pages">
    <div class="page-nbr" @click="gotoPage" v-for="index in pages" :key="index" :class="{ active: page == index }">
      {{ index }}
    </div>
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
      pages: 1,
      page: 1,
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
    this.getCards();
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
    getCards() {
      API
        .get('card', { params: { 'page': this.page } })
        .then((response) => {
          this.cards = response.data.cards;
          this.pages = response.data.pages;
        })
    },
    gotoPage(event) {
      this.page = parseInt(event.target.innerHTML);
      this.getCards();
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;

  .page-nbr {
    line-height: 1.7rem;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid lightgrey;
    cursor: pointer;
    color: lightgrey;
  }

  .active {
    color: black;
    border-color: black;
  }
}
</style>

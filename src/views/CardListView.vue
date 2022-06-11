<template lang="html">
  <div class="card-list">
    <div>
      <h1>Cards list</h1>

      <table>
        <tr>
          <th class="clickable" @click="changeOrder('name')">
            Name
            <span v-show="order === 'name' && asc">&#x21E7;</span>
            <span v-show="order === 'name' && !asc">&#x21E9;</span>
          </th>
          <th class="clickable" @click="changeOrder('category')">
            Category
            <span v-show="order === 'category' && asc">&#x21E7;</span>
            <span v-show="order === 'category' && !asc">&#x21E9;</span>
          </th>
          <th class="clickable" @click="changeOrder('value')">
            Value
            <span v-show="order === 'value' && asc">&#x21E7;</span>
            <span v-show="order === 'value' && !asc">&#x21E9;</span>
          </th>
          <th>Fx</th>
        </tr>
        <CardListItem
          v-for="(card, index) in cards"
          :key="index"
          :card="card"
          @showDetail="showCard($event)"
          @deleteCard="deleteCard($event)"/>
      </table>

    </div>
    <div class="pages">
      <div class="page-nbr" @click="gotoPage" v-for="index in pages" :key="index" :class="{ active: page == index }">
        {{ index }}
      </div>
    </div>
    <CardDetail ref="showCard" />
    <ConfirmPopup ref="deleteCard">
      <h2>Do you really want to destroy '{{ card.name }}'?</h2>
    </ConfirmPopup>
  </div>
</template>

<script>
import { API } from '@/services/Api'
import CardListItem from '../components/CardListItem.vue'
import CardDetail from '../components/CardDetail.vue'
import ConfirmPopup from '../components/ConfirmPopup.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: "CardListView",
  components: {
    CardListItem,
    CardDetail,
    ConfirmPopup
  },
  computed: {
    ...mapState(['card'])
  },
  data() {
    return {
      pages: 1,
      page: 1,
      cards: [],
      order: "name",
      asc: true,
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
    async deleteCard(id) {
      this.getCard(id);
      const ok = await this.$refs.deleteCard.show()
        if (ok) {
          API
            .delete('card/' + id)
            .then((response) => {
              console.log(response);
              console.log(`Deleted card ${id}!`);
              this.getCards();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Aborted");
        }
    },
    getCards() {
      API
        .get('card', { params: { 'page': this.page, 'order': this.order, 'asc': this.asc } })
        .then((response) => {
          this.cards = response.data.cards;
          this.pages = response.data.pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gotoPage(event) {
      this.page = parseInt(event.target.innerHTML);
      this.getCards();
    },
    changeOrder(value) {
      if (this.order == value) {
        this.asc = !this.asc;
      } else {
        this.order = value;
        this.asc = true;
      }
      this.getCards();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template lang="html">

  <div class="card-creation">
    <div class="board">

      <CardForm :value="card"></CardForm>

      <div class="card-wrapper">
        <h2>Preview</h2>
        <CardPreview :card="card"></CardPreview>
      </div>

    </div>
  </div>

</template>

<script>
import { API } from '@/services/Api'
import CardPreview from '../components/CardPreview.vue'
import CardForm from '../components/CardForm.vue'

export default {
  name: "CardEditView",
  components: {
    CardPreview,
    CardForm
  },
  data() {
    return {
        card: {
            id: null,
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
      if(this.$route.params.id != 'new') {
          this.card.id = this.$route.params.id;
          this.getCard(this.card.id);
      }
  },
  methods: {
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

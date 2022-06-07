<template lang="html">

  <div class="card-creation">
    <div class="board">

      <CardForm/>

      <div class="card-wrapper">
        <h2>Preview</h2>
        <CardPreview/>
      </div>

    </div>
  </div>

</template>

<script>
import CardPreview from '../components/CardPreview.vue'
import CardForm from '../components/CardForm.vue'
import { mapActions } from 'vuex'

export default {
  name: "CardCreationView",
  components: {
    CardPreview,
    CardForm
  },
  data() {
    return {

    }
  },
  mounted() {
    this.clearCard();
  },
  methods: {
      ...mapActions(['clearCard'])
  }
}
</script>

<style lang="css" scoped>
</style>

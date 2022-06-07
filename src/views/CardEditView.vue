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
  name: "CardEditView",
  components: {
    CardPreview,
    CardForm
  },
  data() {
    return {

    }
  },
  mounted() {
      if(this.$route.params.id != 'new') {
          this.getCard(this.$route.params.id);
      } else {
          this.clearCard();
      }
  },
  methods: {
      ...mapActions(['getCard', 'clearCard'])
  }
}
</script>

<style lang="css" scoped>
</style>

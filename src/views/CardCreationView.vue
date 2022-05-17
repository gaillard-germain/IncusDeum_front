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
import CardPreview from '../components/CardPreview.vue'
import CardForm from '../components/CardForm.vue'

export default {
  name: "CardCreationView",
  components: {
    CardPreview,
    CardForm
  },
  data() {
    return {
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
}
</script>

<style lang="css" scoped>
</style>

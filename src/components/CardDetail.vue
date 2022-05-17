<template lang="html">

  <PopupModal ref="popup">
    <div class="card-wrapper">
      <CardPreview :card="card"></CardPreview>
    </div>
    <div class="button-wrapper">
      <button type="submit" name="button" @click="close">Close</button>
    </div>

  </PopupModal>

</template>

<script>
import PopupModal from '../components/PopupModal.vue'
import CardPreview from '../components/CardPreview.vue'

export default {
  name: "CardDetail",
  components: {
    PopupModal,
    CardPreview
  },
  props: ['card'],
  data() {
    return {
      resolvePromise: undefined,
      rejectPromise: undefined
    }
  },
  methods: {
    show() {
      this.$refs.popup.open();

      return new Promise((resolve, reject) => {
          this.resolvePromise = resolve;
          this.rejectPromise = reject;
      })
    },
    close() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    }
  },
}

</script>

<style lang="css" scoped>
</style>

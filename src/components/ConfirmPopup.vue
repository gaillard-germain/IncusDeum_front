<template lang="html">

  <PopupModal ref="popup">

    <slot></slot>

    <div class="button-wrapper">
      <button type="button" name="button" @click="confirm">Confirm</button>
      <button type="button" name="button" @click="cancel">Cancel</button>
    </div>

  </PopupModal>

</template>

<script>
import PopupModal from '../components/PopupModal.vue'

export default {
  name: "CardDetail",
  components: {
    PopupModal
  },
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
    confirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },
    cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
    }
  },
}

</script>

<style lang="css" scoped>
</style>

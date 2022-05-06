<template lang="html">

  <PopupModal ref="popup">

    <h2>Create new card's category</h2>

    <form method="post">
      <label for="name"></label>
      <input v-model="name" type="text" name="name" value="" placeholder="Enter category name..." required>
      <div class="button-wrapper">
        <button type="submit" name="button" @click="submitCategory">Submit</button>
        <button type="button" name="button" @click="cancel">Cancel</button>
      </div>
    </form>

  </PopupModal>

</template>

<script>
import { API } from '@/services/Api'
import PopupModal from '../components/PopupModal.vue'

export default {
  name: "AddCategory",
  components: {
    PopupModal
  },
  data() {
    return {
      name: null,
      resolvePromise: undefined,
      rejectPromise: undefined,
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
    submitCategory(event) {
      event.preventDefault();
      console.log(this.name);

      API
        .post('category', this.name)
        .then((response) => {
          console.log(response);
          this.$refs.popup.close();
          this.resolvePromise(true);
        })
        .catch((error) => {
          console.log(error);
          this.cancel();
        });

    },
    cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-wrapper {
    margin: 1rem;

    button {
      margin: 0.5rem;
    }
  }
</style>

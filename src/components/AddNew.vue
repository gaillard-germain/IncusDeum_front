<template lang="html">

  <PopupModal ref="popup">

    <slot></slot>

    <form method="post" @submit="submitNew">
      <div class="input-wrapper" v-for="(value, field, index) in payload" :key="index">
        <label for="field">{{ field }}</label>
        <input v-model="payload[field]" type="text" name="field" placeholder="" required>
      </div>
      <div class="button-wrapper">
        <button type="submit" name="button">Submit</button>
        <button type="button" name="button" @click="cancel">Cancel</button>
      </div>
    </form>

  </PopupModal>

</template>

<script>
import { API } from '@/services/Api'
import PopupModal from '../components/PopupModal.vue'

export default {
  name: "AddNew",
  components: {
    PopupModal
  },
  props: ['fields', 'apiPoint'],
  data() {
    return {
      payload: this.fields,
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
    submitNew(event) {
      event.preventDefault();

      API
        .post(this.apiPoint, this.payload)
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
  .input-wrapper {
    padding: 0.5rem;

    label {
      padding-right: 0.5rem;
    }
  }

  .button-wrapper {
    margin: 1rem;

    button {
      margin: 0.5rem;
    }
  }
</style>

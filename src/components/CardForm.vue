<template lang="html">

    <form class="card-form">
      <h2>Define Card Attributs</h2>
      <div class="card inner-form">
        <div class="face">
          <div class="content">
            <div class="card-header">
              <div class="card-title">
                <input
                  v-model="card.name"
                  type="text"
                  class="input-name"
                  name="name"
                  placeholder="Name..."
                  required>
                <input
                  v-model="card.categorie"
                  type="text"
                  class="input-categorie"
                  name="categorie"
                  placeholder="Categorie..."
                  required>
              </div>
              <div class="input-value-wrapper">
                <input
                  v-model="card.value"
                  type="text"
                  class="input-value"
                  name="value"
                  placeholder="0"
                  maxlength="2"
                  required>
              </div>
            </div>
            <div class="file">
              <label for="frontImage">Front image:</label>
              <input
                @change="setImage"
                type="file"
                class="input-image"
                name="frontImage"
                accept="image/*"
                required>
              <label for="backImage">Back image:</label>
              <input
                @change="setImage"
                type="file" class="input-image"
                name="backImage"
                accept="image/*"
                required>
              <div class="color-wrapper">
                <label for="color">Border color:</label>
                <input
                  @change="setColor"
                  type="color"
                  class="input-color"
                  name="color"
                  value="#474543"
                  required>
              </div>
            </div>
            <div class="card-description">
              <textarea
                v-model="card.quote"
                class="input-quote"
                name="quote"
                rows="3" cols="20"
                placeholder="Description..."
                required>
              </textarea>
              <input
                v-model="card.fx"
                type="text"
                class="input-fx"
                name="fx"
                placeholder="Effects..."
                required>
            </div>
          </div>
        </div>
      </div>
      <button class="submit-btn" type="submit">Submit card</button>
      <p class="text-warning">{{ message }}</p>
    </form>

</template>

<script>
export default {
  name: "CardForm",
  props: ['value'],
  data() {
    return {
      card: this.value,
      message: null,
    }
  },
  methods: {
    setImage(event) {
      this.message = null;
      var files = event.target.files;
      var url = event.target.value;
      var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
      if (files && files[0] &&
          (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg"))
        {
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);

          return new Promise(resolve => {
            reader.onload = function (e) {
              resolve(e.target.result);
            }
          }).then(result => {
            if (event.target.name === 'frontImage') {
              this.card.frontImage = result;
            } else if (event.target.name === 'backImage') {
              this.card.backImage = result;
            }
          });

        } else {
          this.message = "No file or bad extension (gif, png, jpg, jpeg only)!";
        }
    },
    setColor(event) {
      this.card.color = event.target.value;
    },
  },
}
</script>

<style lang="css" scoped>
</style>

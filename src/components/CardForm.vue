<template lang="html">

    <form
      @submit="submitCard"
      class="card-form"
      method="post"
      enctype="multipart/form-data">
      <h2>Define Card Attributs</h2>
      <div class="card">
        <div class="face inner-form">
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
                <select class="input-category" name="category" @change="setCategory">
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <!-- <input
                  v-model="card.category"
                  type="text"
                  class="input-category"
                  name="category"
                  placeholder="Category..."
                  required> -->
              </div>
              <div class="value">
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
                accept="image/*">
              <label for="backImage">Back image:</label>
              <input
                @change="setImage"
                type="file" class="input-image"
                name="backImage"
                accept="image/*">
              <div class="color-wrapper">
                <label for="color">Color:</label>
                <input
                  @change="setColor"
                  type="color"
                  class="input-color"
                  name="color"
                  value="#474543">
              </div>
            </div>
            <div class="card-description">
              <textarea
                v-model="card.description"
                class="input-description"
                name="description"
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
import { API } from '@/services/Api'

export default {
  name: "CardForm",
  props: ['value'],
  data() {
    return {
      categories: null,
      card: this.value,
      message: null,
    }
  },
  mounted() {
    API
      .get('category')
      .then((response) => {
        console.log(response.data);
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    setCategory(event) {
      this.card.category = this.categories.find(
        (e) => e.id == event.target.value
      );
    },
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
    submitCard(event){
      event.preventDefault();

      API
        .post('card', this.card)
        .then((response) => {
          console.log(response);
          this.$router.push('/card_list');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
}
</script>

<style lang="css" scoped>
</style>

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
                <div class="input-category">
                  <select name="category" @change="setCategory" title="Select a categorie">
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <button class="add-button" type="button" name="addCategory" @click="addCategory" title="Add new category">+</button>
                </div>
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
                rows="3" cols="30"
                placeholder="Description..."
                required>
              </textarea>
              <div class="info">Scroll down to see all fx...</div>
              <div class="input-fx">
                <div class="checkbox-wrapper" v-for="fx in fxs" :key="fx.id">
                  <label for="fx.name">{{ fx.name }} {{ fx.value }}</label>
                  <input type="checkbox" @click="setFx" :name="fx.name" :value="fx.id">
                </div>
                <button class="add-button" type="button" name="addFx" @click="addFx" title="Add new effect">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="submit-btn" type="submit">Submit card</button>
      <p class="text-warning">{{ message }}</p>
    </form>
    <AddNew ref="addCategory" :fields="categoryInputs" :apiPoint="'category'">
      <h2>Create new card's category</h2>
    </AddNew>
    <AddNew ref="addFx" :fields="fxInputs" :apiPoint="'fx'">
      <h2>Create new card's effect</h2>
    </AddNew>

</template>

<script>
import { API } from '@/services/Api'
import AddNew from './AddNew.vue'

export default {
  name: "CardForm",
  components: {
    AddNew
  },
  props: ['value'],
  data() {
    return {
      categoryInputs: {"name": null},
      fxInputs: {"name": null, "value": null},
      categories: null,
      fxs: null,
      card: this.value,
      message: null,
      frontFile: null
    }
  },
  mounted() {
    this.getCategory();
    this.getFx();
  },
  methods: {
    getCategory() {
      API
        .get('category')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFx() {
      API
        .get('fx')
        .then((response) => {
          this.fxs = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCategory(event) {
      this.card.category = this.categories.find(
        (e) => e.id == event.target.value
      );
    },
    setFx(event) {
      let fx = this.fxs.find((e) => e.id == event.target.value);
      if (event.target.checked) {
        this.card.fx.push(fx);
      } else {
        this.card.fx = this.card.fx.filter((e) => { return e !== fx })
      }
    },
    async addCategory() {
      const ok = await this.$refs.addCategory.show()
            if (ok) {
              this.getCategory();
              console.log("New category added");
            } else {
              console.log("Aborted");
            }
    },
    async addFx() {
      const ok = await this.$refs.addFx.show()
            if (ok) {
              this.getFx();
              console.log("New effect added");
            } else {
              console.log("Aborted");
            }
    },
    setImage(event) {
      this.message = null;
      var files = event.target.files;
      var url = event.target.value;
      var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
      if (files && files[0] &&
          (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg"))
        {
            if (event.target.name === 'frontImage') {
              this.card.frontImage = URL.createObjectURL(files[0]);
              this.frontFile = files[0];
            } else if (event.target.name === 'backImage') {
              this.card.backImage = URL.createObjectURL(files[0]);
              this.backFile = files[0];
            }

        } else {
          this.message = "No file or bad extension (gif, png, jpg, jpeg only)!";
        }
    },
    uploadImage(file) {
      var formdata = new FormData();
      formdata.append('file', file);
      return API
        .post('media', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
          console.log(response);
          return response.data.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setColor(event) {
      this.card.color = event.target.value;
    },
    async submitCard(event){
      event.preventDefault();

      this.card.frontImage = await this.uploadImage(this.frontFile);

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

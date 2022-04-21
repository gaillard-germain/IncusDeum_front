<template lang="html">

  <div class="board">

    <form class="card-form">
      <h2>Define Card Attributs</h2>
      <div class="card inner-form">
        <div class="face">
          <div class="content">
            <div class="card-header">
              <div class="card-title">
                <input
                  v-model="name"
                  type="text"
                  class="input-name"
                  placeholder="Name..."
                  required>
                <input
                  v-model="categorie"
                  type="text"
                  class="input-categorie"
                  placeholder="Categorie..."
                  required>
              </div>
              <div class="input-value-wrapper">
                <input
                  v-model="value"
                  type="text"
                  class="input-value"
                  placeholder="0"
                  maxlength="2"
                  required>
              </div>
            </div>
            <div class="file">
              <label for="front-image">Front image:</label>
              <input
                @change="setImage($event, 'front')"
                type="file"
                class="input-image"
                accept="image/*"
                required>
              <label for="back-image">Back image:</label>
              <input
                @change="setImage($event, 'back')"
                type="file" class="input-image"
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
                v-model="quote"
                class="input-quote"
                rows="3" cols="20"
                placeholder="Description..."
                required>
              </textarea>
              <input
                v-model="fx"
                type="text"
                class="input-fx"
                placeholder="Effects..."
                required>
            </div>
          </div>
        </div>
      </div>
      <button class="submit-btn" type="submit">Submit card</button>
    </form>

    <div @click="toggleActive" class="card-wrapper">
      <h2>Preview</h2>
      <div
        id="card-preview"
        class="card"
        :class="{ active: isActive }"
        :style="{ 'border-color': color, 'transform': rotate }">
        <div id="front" class="face" :class="{ hidden: reverse }">
          <div class="content">
            <div class="card-header">
              <div class="card-title">
                <div class="name">{{ name }}</div>
                <div class="categorie">{{ categorie }}</div>
              </div>
              <div class="value">{{ value }}</div>
            </div>
            <div class="card-description">
              <div class="quote">{{ quote }}</div>
              <div class="fx">{{ fx }}</div>
            </div>
          </div>
        </div>
        <div id="back" class="face" :class="{ hidden: !reverse }"></div>
      </div>
    </div>

    <p class="text-warning">{{ message }}</p>

  </div>

</template>

<script>
export default {
  name: "CardCreationView",
  data() {
    return {
      name: null,
      categorie: null,
      value: null,
      quote: null,
      fx: null,
      color: null,
      cardCenterX: 0,
      cardCenterY: 0,
      rotate: null,
      message: null,
      isActive: false,
      reverse: false,
    }
  },
  mounted() {
    let card = document.getElementById("card-preview");
    let rect = card.getBoundingClientRect();
    this.cardCenterX = rect.left + card.offsetWidth/2;
    this.cardCenterY = rect.top + card.offsetHeight/2;
  },
  methods: {
    setImage(event, id) {
      this.message = null;
      var side = document.getElementById(id);
      var input = event.target;
      var url = input.value;
      var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
      if (input.files && input.files[0] &&
          (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg"))
        {
          var reader = new FileReader();
          reader.onload = function (e) {
            side.style.backgroundImage = `url('${e.target.result}')`;
          }
          reader.readAsDataURL(input.files[0]);
        } else {
          this.message = "No file or bad extension (gif, png, jpg, jpeg only)!";
        }
    },
    setColor(event) {
      this.color = event.target.value;
    },
    toggleActive() {
      if (this.isActive) {
        this.isActive = false;
        this.reverse = false;
        this.rotate = `rotate3d(1, 1, 1, 0deg)`;
        window.removeEventListener("mousemove", this.flipCard);
      } else {
        this.isActive = true
        window.addEventListener("mousemove", this.flipCard);
      }
    },
    flipCard(event) {
      let dx = event.x - this.cardCenterX;
      let dy = event.y - this.cardCenterY;
      let angle = Math.atan2(dy, dx) * 180 / Math.PI;
      this.rotate = `rotate3d(1, 1, 1, ${angle}deg)`;
      if (angle > 120 || angle < -120) {
        if (!this.reverse) {
          this.reverse = true;
        }
      } else if (this.reverse) {
          this.reverse = false;
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>

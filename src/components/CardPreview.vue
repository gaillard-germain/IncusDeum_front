<template lang="html">

  <div
    id="card-preview"
    @click="toggleActive"
    class="card clickable"
    :class="{ active: isActive }"
    :style="{ '--card-color': card.color, 'transform': rotate }">
    <div
      class="face front"
      :class="{ hidden: reverse }"
      :style="{ 'background-image': `url('${card.frontImage.url}')` }"
      >
      <div class="content">
        <div class="card-header">
          <div class="card-title">
            <div class="name">{{ card.name }}</div>
            <div class="category">{{ card.category.name }}</div>
          </div>
          <div class="value">{{ card.value }}</div>
        </div>
        <div class="card-description">
          <div class="description">{{ card.description }}</div>
          <div class="fx-wrapper">
            <div v-for="fx in card.fx" class="fx" :key="fx.id">
              {{ fx.name }} {{ fx.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="face back"
      :class="{ hidden: !reverse }"
      :style="{ 'background-image': `url('${card.backImage.url}')` }">
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "CardPreview",
  computed: {
      ...mapState(['card'])
  },
  data() {
    return {
      centerX: 0,
      centerY: 0,
      rotate: null,
      isActive: false,
      reverse: false,
    }
  },
  mounted() {
    let card = document.getElementById("card-preview");
    let rect = card.getBoundingClientRect();
    this.centerX = rect.left + card.offsetWidth/2;
    this.centerY = rect.top + card.offsetHeight/2;
  },
  methods: {
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
      let dx = event.x - this.centerX;
      let dy = event.y - this.centerY;
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

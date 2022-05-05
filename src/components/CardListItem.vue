<template lang="html">
  <div class="row">
    <div class="cell">
      {{ card.name }}
    </div>
    <div class="cell">
      {{ card.category.name }}
    </div>
    <div class="cell">
      {{ card.value }}
    </div>
    <div class="cell">
      <div v-for="effect in card.fx" :key="effect.id">
        {{ effect.name }} {{ effect.value }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CardListItem",
  props: ['card']
}
</script>

<style lang="css" scoped>
.row {
  display: flex;
  padding: 0.5rem;
}
.cell {
  padding: 0.5rem;
}
</style>

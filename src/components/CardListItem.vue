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
      <div v-for="fx in card.fx" :key="fx.id">
        {{ fx.name }} {{ fx.value }}
      </div>
    </div>
    <button class="button" type="button" name="button" @click="$emit('showDetail', card.id)">Show</button>
    <router-link class="button" :to="{ name: 'card_edit', params: { id: card.id } }">Edit</router-link>
  </div>
</template>

<script>
export default {
  name: "CardListItem",
  props: ['card'],

}
</script>

<style lang="css" scoped>
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.2rem;
  margin: 0.2rem auto;
  background-color: lightgrey;
}
.cell {
  margin: 0.2rem;
  padding: 0.5rem;
  border: 1px solid grey;
  background-color: white;
  width: 8rem;
}
.button {
  margin: 0.2rem;
  padding: 0.3rem;
  text-decoration: none;
  font-size: 1rem;
  border: 1px solid grey;
  border-radius: 5px;
  color: black;
  background-color: white;
  font-family: inherit;
  line-height: normal;
}
</style>

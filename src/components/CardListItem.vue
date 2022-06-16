<template lang="html">
  <tr class="row" :style="{ 'background-color': card.color }">
    <td class="cell">
      {{ card.name }}
    </td>
    <td class="cell">
      {{ card.category.name }}
    </td>
    <td class="cell">
      {{ card.value }}
    </td>
    <td class="cell">
      <div v-for="fx in card.fx" :key="fx.id">
        {{ fx.name }} {{ fx.value }}
      </div>
    </td>
    <td class="cell">
      <button class="button" type="button" name="showBtn" @click="$emit('showDetail', card.id)" title="Show"><font-awesome-icon :icon="['far', 'eye']" /></button>
      <button class="button" type="button" name="showBtn" @click="$router.push({ name: 'card_edit', params: { id: card.id } })" title="Edit"><font-awesome-icon :icon="['far', 'edit']" /></button>
      <button class="button" type="button" name="deleteBtn" @click="$emit('deleteCard', card.id)" title="Delete"><font-awesome-icon :icon="['far', 'trash-alt']" /></button>
    </td>

  </tr>
</template>

<script>
export default {
  name: "CardListItem",
  props: ['card'],
}
</script>

<style lang="css" scoped>
</style>

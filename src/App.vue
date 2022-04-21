<template>
  <header>
    <h1>Card Maker</h1>
  </header>
  <CardCreation/>
</template>

<script>
import CardCreation from './components/CardCreation.vue'

export default {
  name: 'App',
  components: {
    CardCreation,
  }
}
</script>

<style>
</style>

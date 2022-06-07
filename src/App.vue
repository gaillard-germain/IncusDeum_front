<template>

  <header>
    <h1>Incus Deum</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/card_list">Card list</router-link> |
      <router-link to="/card_create">Create New Card</router-link>
    </nav>
  </header>

  <router-view/>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3b3a39;
}

header {

  nav {
    padding: 1rem;

    a {
      font-weight: bold;
      text-decoration: none;
      color: #3b3a39;

      &.router-link-exact-active {
        color: grey;
        text-decoration: underline;
      }
    }
  }
}
</style>

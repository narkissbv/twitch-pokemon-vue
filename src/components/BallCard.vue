<template>
  <div class="ball-card" @click="catchPokemon">
    <div class="img-container">
      <img :src="require('@/assets/pokeball.png')"/>
    </div>
    <div class="name">Catch pokemon!</div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'

  const store = useStore()

  const catchPokemon = async () => {
    await store.dispatch('setLoading', true);
    
    const resp = await store.dispatch('catchPokemon');
    if (resp.data.success) {
      await store.dispatch('setLoading', false);
      const message = `Yay! You caught ${resp.data.name}!`
      await store.dispatch('setSnackbar', message);
      await store.dispatch('fetchPokemons');
      return
    }
    // show message that pokemon escaped
    const message = 'Oh snap! Pokemon got away. Try again...'
    await store.dispatch('setSnackbar', message);
    await store.dispatch('setLoading', false);
  }
</script>

<style scoped>
  .ball-card {
    cursor: pointer;
  }
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
  }
  .img-container img {
    height: 60px;
  }
</style>
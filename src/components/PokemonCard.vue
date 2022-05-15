<template>
  <div class="pokemon-card">
    <div class="img-container">
      <img :src="props.pokemon.img"/>
    </div>
    <div class="name">{{ props.pokemon.name }}</div>
    <div class="actions">
      <img class="release"
           :src="require('@/assets/delete.svg')"
           @click="release"
      />
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  // methods
  const release = async () => {
    store.dispatch('setLoading', true);
    await store.dispatch('releasePokemon', props.pokemon.name);
    await store.dispatch('fetchPokemons');
    store.dispatch('setLoading', false);
  }

  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  })
</script>

<style scoped>
  .pokemon-card {
    position: relative;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
  }

  .actions {
    position: absolute;
    bottom: 15px;
    right: 0px;
    cursor: pointer;
  }

  .name {
    text-align: center;
  }

</style>
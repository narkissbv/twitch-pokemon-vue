<template>
  <div class="flex">
    <pokemon-card v-for="(pokemon, index) in pokemons"
                  :key="index"
                  :pokemon="pokemon"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import PokemonCard from '@/components/PokemonCard'
  import { useStore } from 'vuex'
  const store = useStore()
  const pokemons = computed(() => store.state.pokemons)
</script>

<style scoped>
  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>

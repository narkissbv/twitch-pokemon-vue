<template>
  <div class="flex" v-if="pokemons.length">
    <pokemon-card v-for="(pokemon, index) in pokemons"
                  :key="index"
                  :pokemon="pokemon"
    />
  </div>
  <div v-else class="no-pokemons">
    <h2>You currently have no pokemons</h2>
    <p>Type <span class="command">!pokemon</span> in chat to catch pokemons!</p>
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

  .no-pokemons {
    text-align: center;
  }

  .command {
    color: #bf94ff;
  }
</style>

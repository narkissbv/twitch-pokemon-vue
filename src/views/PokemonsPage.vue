<template>
  <div class="flex">
    <pokemon-card v-for="(pokemon, index) in pokemons"
                  :key="index"
                  :pokemon="pokemon"
    />    
    <ball-card v-for="(ball, index) in balls"
              :key="index"
              :ball="ball"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import PokemonCard from '@/components/PokemonCard'
  import BallCard from '@/components/BallCard'
  import { useStore } from 'vuex'
  // import BallCard from '@/components/BallCard.vue';
  const store = useStore()
  const pokemons = computed(() => store.state.pokemons)
  const balls = computed(() => {
    const numberOfBalls = 10 - store.state.pokemons.length
    const ballsItems = []
    for (let i = 0 ; i < numberOfBalls ; i++) {
      ballsItems.push(i)
    }
    return ballsItems
  })
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

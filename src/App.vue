<template>
  <tp-header/>
  <component :is="navigate"></component>
  <tp-loader/>
</template>

<script setup>
  import AuthPage from '@/views/AuthPage'
  import TpHeader from '@/components/TpHeader'
  import PokemonsPage from '@/views/PokemonsPage'
  import TpLoader from '@/components/TpLoader'
  import { useStore } from 'vuex'
  import { computed, onMounted } from 'vue'
  import twitch from '@/utils/twitch'

  const store = useStore()
  // computed
  const viewer = computed(() => store.state.viewer)
  const navigate = computed(() => {
    if (viewer.value?.id) {
      return PokemonsPage
    }
    return AuthPage
  })

  onMounted( () => {
    twitch.onAuthorized(async function (auth) {
      store.dispatch('setLoading', true);
      store.dispatch('setAuth', auth);
      store.dispatch('setViewer');
      if (viewer.value?.id) {
        await store.dispatch('fetchUserData');
        await store.dispatch('fetchPokemons');
        store.dispatch('setLoading', false);
      } else {
        store.dispatch('setLoading', false);
      }
    })
  })

</script>

<style>
  body {
    background: #1f1f23;
    color: white;
    padding: 0;
    margin: 0;
    font-family: Inter,Roobert,Helvetica Neue,Helvetica,Arial,sans-serif;
    height: 100vh;
    position: relative;
  }
</style>

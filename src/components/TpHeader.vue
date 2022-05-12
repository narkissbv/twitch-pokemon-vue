<template>
  <div class="header-container">
    <div v-if="viewer?.id" @click="refresh" class="refresh"></div>
    <div class="title">{{ title }}</div>
    <div class="help" @click="openHelpModal"></div>
    <help-modal v-if="isHelpModalActive" @close="closeHelpModal"></help-modal>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import HelpModal from '@/components/HelpModal'
  
  const store = useStore()
  let isHelpModalActive = ref(false)

  // computed
  const viewer = computed(() => store.state.viewer)
  const username = computed(() => store.state.username)
  const title = computed(() => {
    if (viewer.value?.id) {
      return `${username.value}'s pokemons`
    }
    return 'Hello viewer!'
  })

  // methods
  const closeHelpModal = () => {
    isHelpModalActive.value = false
  }
  const openHelpModal = () => {
    isHelpModalActive.value = true
  }
  const refresh = async () => {
    store.dispatch('setLoading', true);
    await store.dispatch('fetchPokemons');
    store.dispatch('setLoading', false);
  }
</script>

<style scoped>
  .header-container {
    padding-top: 10px;
    position: relative;
  }
  .refresh,
  .help {
    position: absolute;
    width: 24px;
    height: 24px;
    background-size: contain;
    cursor: pointer;
  }
  .title {
    text-align: center;
    line-height: 24px;
  }
  .refresh {
    background-image: url('~@/assets/refresh.svg');
    top: 10px;
    left: 10px;
  }
  .help {
    background-image: url('~@/assets/help.svg');
    top: 10px;
    right: 10px;
  }
</style>

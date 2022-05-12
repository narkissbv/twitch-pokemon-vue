<template>
  <div class="loader" v-if="active">
    <img :src="require('@/assets/loader.svg')"/>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  // computed
  const active = computed(() => store.state.loading)
</script>

<style scoped>
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 2;
  }
</style>

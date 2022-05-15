<template>
  <div class="snack-bar"
       :class="{'active': message.length}">
    <span class="message">{{ message }}</span>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, watchEffect } from 'vue'
  const store = useStore()
  const message = computed( () => store.state.snackbar)
  watchEffect(()=> {
    const message = store.state.snackbar
    if (message.length) {
      setTimeout(() => {
        store.dispatch('setSnackbar', '');
      }, 3000)
    }
  })
</script>

<style scoped>
  .snack-bar {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    bottom: -50px;
    width: 90%;
    padding: 0px 10px;
    height: 50px;
    left: 5%;
    z-index: 2;
    background-color: rgba(0,0,0,0.9);
    color: white;
    transition: all 0.3s ease;
  }

  .snack-bar.active {
    transform: translateY(-60px);
  }
</style>
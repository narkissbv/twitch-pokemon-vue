<template>
  <div class="help-modal">
    <div @click="closeModal" class="close"></div>
    <section>
      <h3>How to play</h3>
      <p>Catch up to 10 pokemons at once</p>
      <p>Try getting 10 pokemons of the same kind!</p>
    </section>
    
    <section style="display: none">
      <h4>Nightbot chat commands</h4>
      <p><span class="command">!pokemon</span> - try catch a pokemon</p>
      <p><span class="command">!pokemon list</span> - show your pokemons in a list</p>
      <p><span class="command">!pokemon release NUMBER</span> - release the pokemon that is number NUMBER.
        <br/>
        For example: <span class="command">!pokemon release 2</span></p>
    </section>
    
    <section>
      <h4>Panel extension</h4>
      <p>
        <img class="icon" :src="require('@/assets/refresh.svg')"/>
        <span>Refresh button - updates the list of pokemons (in case you caught or released pokemons from chat command)</span>
      </p>
      <p>
        <img class="icon" :src="require('@/assets/help.svg')"/>
        <span>Help button - show this message</span>
      </p>
      <p>
        <img class="icon" :src="require('@/assets/delete.svg')"/>
        <span>Release buttons - releases the corresponding pokemon</span>
      </p>
      <p>
        <img class="icon" :src="require('@/assets/pokeball.png')"/>
        <span>Catch button - try catching a new pokemon</span>
      </p>
    </section>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
  // define emits
  const emit = defineEmits(['close'])

  // methods
  const closeModal = () => {
    emit('close')
  }
</script>

<style scoped>
  .help-modal {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    z-index: 1;
    overflow: auto;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background-image: url('~@/assets/close.svg');
    background-size: contain;
  }

  section {
    padding: 0 10px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid white;
  }
  section:last-child {
    border: none;
  }
  section p {
    display: flex;
    align-items: center;
  }
  section img {
    margin-right: 10px;
  }

  .command {
    color: #bf94ff;
  }

  .icon {
    height: 24px;
    width: 24px;
  }
</style>
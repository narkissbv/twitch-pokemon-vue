import { createStore } from 'vuex'
import axios from 'axios';
import twitch from '@/utils/twitch'

const store = createStore({
 state() {
   return {
     pokemons: [],
     username: '',
     auth: null,
     viewer: null,
     loading: false,
   }
  },
  mutations: {
    addPokemon(state, pokemonCard) {
      state.pokemons.push(pokemonCard);
    },
    removePokemon(state, pokemonCard) {
      state.pokemons = state.pokemons.filter( stateCard => {
        return stateCard.name !== pokemonCard
      })
    },
    setAuthToken(state, auth) {
      state.auth = auth;
    },
    setViewer(state, viewer) {
      state.viewer = viewer
    },
    setUsername(state, user) {
      state.username = user.data.data[0].display_name
    },
    reset(state) {
      state.pokemons = []
    },
    setLoading(state, isLoading) {
      state.loading = isLoading
    },
  },

  actions: {
    async addPokemon({ commit }, pokemon) {
      const pokemonCard = {
        name: pokemon,
        img: require('@/assets/nopokemon.png'),
      }
      try {
        // fetch Pokemon data from PokeAPI
        const pokeApiResp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`);
        pokemonCard.img = pokeApiResp.data.sprites.front_default;
      } catch (e) {
        console.log(`Pokemon ${pokemon} not found in PokeAPI. Fallback to default`);
      } finally {
        commit('addPokemon', pokemonCard);
      }
    },

    async fetchPokemons(context) {
      try {
        const pokemonsList = await axios.get(`https://cindy.narxx.com/pokemon.php?username=${context.state.username}&query=list&mode=json`);
        context.commit('reset');
        pokemonsList.data.forEach( async pokemon => {
          await context.dispatch('addPokemon', pokemon);
        })
        return pokemonsList
      } catch (e) {
        console.log('Error fetching data from API', e);
      }
    },

    setAuth({ commit }, authToken) {
      commit('setAuthToken', authToken);
    },

    setViewer({ commit }) {
      commit('setViewer', twitch.viewer)
    },

    async fetchUserData(context) {
      try {
        const userData = await axios.get(`https://api.twitch.tv/helix/users?id=${context.state.viewer.id}`, {
          headers: {
            'Authorization': `Extension ${context.state.auth.helixToken}`,
            'Client-Id': '77i6foesbbuvte4ch7hfe8dmqq9g7a'
          }
        })
        context.commit('setUsername', userData)
        return userData;
      } catch (e) {
        console.log('Failed API request to retieve user data from Twitch');
      }
    },

    async releasePokemon(context, pokemon) {
      try {
        const username = context.state.username
        const resp = await axios.get(`https://cindy.narxx.com/pokemon.php?username=${username}&query=release_name%20${pokemon}`)
        return resp;
      } catch (e) {
        console.log(`Failed to release ${pokemon}`, e);
      }
    },

    setLoading({ commit }, isLoading) {
      commit('setLoading', isLoading);
    },
  },
})
export default store

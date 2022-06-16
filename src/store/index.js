import { createStore } from 'vuex'
import { API } from '@/services/Api'

export default createStore({
  state: {
    card: null
  },
  getters: {

  },
  mutations: {
    UPDATE_CARD(state, card) {
      state.card = card;
    },
    CLEAR_CARD(state) {
      state.card = {
          id: null,
          name: "",
          category: {
            id: null,
            name: ""
          },
          value: null,
          frontImage: {
            id: null,
            url: ""
          },
          backImage: {
            id: null,
            url: ""
          },
          color: "#474543",
          description: "",
          fx: []
      };
    }
  },
  actions: {
    getCard({commit}, id) {
      API
      .get('card/' + id)
      .then((response) => {
        commit('UPDATE_CARD', response.data)
      })
    },
    clearCard({commit}) {
      commit('CLEAR_CARD')
    }
  },
  modules: {
  }
})

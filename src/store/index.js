import { createStore } from 'vuex'
import { API } from '@/services/Api'

export default createStore({
  state: {
      card: {
          id: null,
          name: "",
          category: {
            id: 0,
            name: ""
          },
          value: 0,
          frontImage: {
            url: ""
          },
          backImage: {
            url: ""
          },
          color: "",
          description: "",
          fx: []
      },
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
                id: 0,
                name: ""
              },
              value: 0,
              frontImage: {
                url: ""
              },
              backImage: {
                url: ""
              },
              color: "",
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

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requests: [],
        selectedItem: false,
        score: 0,
        tooltip: ''
    },
    mutations: {
        'ADD_REQUEST': (state, payload) => {
            state.requests.push(payload)
        },
        'SET_SELECTED': (state, payload) => {
            state.selectedItem = payload || false
        }
    }
})

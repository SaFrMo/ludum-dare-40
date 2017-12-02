import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requests: [],
        staging: false,
        selectedItem: false,
        score: 0,
        tooltip: '',
        cache: []
    },
    mutations: {
        'ADD_REQUEST': (state, payload) => {
            state.requests.push(payload)
        },
        'SET_SELECTED': (state, payload) => {
            state.selectedItem = payload || false
        },
        'MOVE_TO_RECEIVING': (state, payload) => {
            state.staging = false
            state.requests.push(payload)
        },
        'MOVE_TO_STAGING': (state, payload) => {
            state.requests = state.requests.filter(x => x.id !== payload.id)
            if (state.staging) {
                // Move staging back to receiving
                state.requests.push(state.staging)
            }
            state.staging = payload
        }
    }
})

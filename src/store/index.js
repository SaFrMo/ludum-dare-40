import Vue from 'vue'
import Vuex from 'vuex'
import files from '@/gameplay/files'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requests: [],
        staging: false,
        selectedItem: false,
        score: 0,
        totalSubmitted: 0,
        tooltip: '',
        cache: [],
        output: [],
        files,
        timerStart: 0,
        timerStop: 0,
        timerOn: false,
        message: false
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
        },
        'ADD_FILE_TO_STAGING': (state, payload) => {
            state.staging.files.push(payload)
        },
        'REMOVE_FILE_FROM_STAGING': (state, payload) => {
            state.staging.files.splice(payload, 1)
        },
        'MOVE_TO_OUTPUT': (state, payload) => {
            const toMove = state.staging
            state.staging = false
            state.output.push(toMove)
        },
        'REMOVE_OLDEST_OUTPUT': (state, payload) => {
            state.output.shift()
        },
        'SET_RESPONSE_CODE': (state, newCode) => {
            state.staging.code = newCode
        },
        'CHANGE_SCORE_BY': (state, delta) => {
            state.score += delta
        },
        'INCREMENT_TOTAL_SUBMITTED': state => {
            state.totalSubmitted++
        },
        'ADD_FILE': (state, payload) => {
            state.files.push(payload)
            state.files.sort()
        },
        'ACTIVATE_TIMER': state => {
            state.timerStart = Date.now()
            state.timerOn = true
        },
        'DEACTIVATE_TIMER': state => {
            state.timerStop = Date.now()
            state.timerOn = false
        },
        'SET_MESSAGE': (state, payload) => {
            state.message = payload
        },
        'RESET_BOARD': state => {
            state.requests = []
            state.staging = false
            state.output = []
        }
    }
})

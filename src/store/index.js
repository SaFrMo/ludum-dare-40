import Vue from 'vue'
import Vuex from 'vuex'

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
        files: [],
        timerValue: 0,
        timerLoop: false,
        timerDoneMarker: false,
        message: false,
        debug: true,
        secondsPerRound: 20,
        requestsReceived: 0
    },
    mutations: {
        'ADD_REQUEST': (state, payload) => {
            state.requestsReceived++
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

        // HTTP methods
        'ADD_FILE_TO_STAGING': (state, payload) => {
            state.staging.files.push(payload)
        },
        'REMOVE_FILE_FROM_STAGING': (state, payload) => {
            state.staging.files.splice(payload, 1)
        },
        'POST_DATA': (state, payload) => {
            const path = typeof payload === 'string' ? payload : payload.name
            state.staging.responseBody.push(`Data posted to <code>/${path}</code>.`)
        },
        'UNDO_POST_DATA': (state, payload) => {
            state.staging.responseBody.splice(payload, 1)
        },

        // Move requests/responses
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
        'SET_TOTAL_SUBMITTED': (state, payload) => {
            state.totalSubmitted = payload
        },
        'INCREMENT_TOTAL_SUBMITTED': state => {
            state.totalSubmitted++
        },
        'ADD_FILE': (state, payload) => {
            state.files.push(payload)
            state.files.sort()
        },
        'START_TIMER': (state, payload) => {
            state.timerStart = Date.now()
            state.timerLoop = setInterval(() => state.timerValue++, 250)
        },
        'STOP_TIMER': state => {
            state.timerStop = Date.now()
            clearTimeout(state.timerLoop)
            state.timerLoop = false
        },
        'SET_MESSAGE': (state, payload) => {
            state.message = payload
        },
        'RESET_BOARD': state => {
            state.files = []
            state.requests = []
            state.staging = false
            state.output = []
            state.score = 0
            state.totalSubmitted = 0
            state.timerValue = 0
            state.requestsReceived = 0
        }
    }
})

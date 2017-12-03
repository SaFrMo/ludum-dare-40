<template>
    <div class="game-engine"></div>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels'
    import Request from '@/gameplay/Request'
    export default {
        mounted () {
            if (this.$route.params.level === '1') {
                for (let i = 0; i < this.$route.params.step || 0; i++) {
                    this.$store.commit('INCREMENT_TOTAL_SUBMITTED')
                }
                if (!this.$route.params.step) {
                    setTimeout(() => {
                        this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[0].req)
                    }, 1000)
                }
            }
        },
        props: {
            'scripted-events': { type: Object }
        },
        computed: {
            currentScriptedEvents () {
                return scriptedEvents[this.$route.params.level - 1]
            },
            totalSubmitted () {
                return this.$store.state.totalSubmitted
            }
        },
        watch: {
            totalSubmitted (newVal) {
                // only on level 1
                if (this.$route.params.level === '1') {
                    setTimeout(() => {
                        if (this.currentScriptedEvents.length <= newVal) {
                            this.$store.commit('ADD_REQUEST', new Request())
                            return
                        }

                        this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[newVal].req)
                        // Run any callbacks
                        if (this.currentScriptedEvents[newVal].callback) {
                            this.currentScriptedEvents[newVal].callback()
                        }
                    }, Math.random() * 2000)
                }
            },
            '$store.state.score' (newVal) {
                if (newVal >= 10) {
                    this.$store.commit('SET_MESSAGE', 'Level complete!')
                }
            }
        }
    }
</script>

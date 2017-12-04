<template>
    <div class="game-engine"></div>
</template>

<script>
    import Request from '@/gameplay/Request'
    import filePool from '@/gameplay/filePool'
    export default {
        data () {
            return {
                scriptedEvents: [
                    require('@/gameplay/levels/level1').default,
                    require('@/gameplay/levels/level2').default
                ],
                loop: false
            }
        },
        mounted () {
            if (!this.$store.state.debug && parseInt(this.$route.params.level) >= 3) {
                this.startCountdown()
            } else {
                this.setupLevel()
            }
        },
        methods: {
            randomFromArray (arr) {
                return arr[Math.floor(Math.random() * arr.length)]
            },
            startTimer () {
                this.$store.commit('START_TIMER')
                this.$store.state.timerDoneMarker = setTimeout(() => {
                    this.$store.commit('STOP_TIMER')
                    this.$store.commit('SET_MESSAGE', this.getSummary())
                    clearTimeout(this.loop)
                    this.loop = false
                }, this.$store.state.secondsPerRound * 1000)
            },
            getSummary () {
                let output = `Level ${this.$route.params.level} complete!<br/>
                Score: ${this.$store.state.score}<br/>
                Percent Correct: ${Math.ceil((this.$store.state.score / this.$store.state.totalSubmitted) * 100)}%<br/>
                Average Time per Response: ${(this.$store.state.secondsPerRound * 4 / this.$store.state.totalSubmitted).toFixed(2)} ms<br/>
                Requests Received: ${this.$store.state.requestsReceived}`

                if (this.$route.params.level === '3') {
                    output += '<br/><br/>The game continues on an infinite loop from here, pulling from a few different sets of files with requests coming in faster every level.<br/><br/>You can also change the URL to level-(any number) to jump to different levels yourself.<br/><br/>Thanks for playing and happy Ludum Dare 40!'
                }

                return output
            },
            setupLevel () {
                // Clear score, timer, all game files at start of new level
                this.$store.commit('RESET_BOARD')
                this.$store.commit('SET_MESSAGE', '')

                if (parseInt(this.$route.params.level) >= 3) {
                    this.startTimer()
                }

                let output
                try {
                    output = require(`@/gameplay/levels/level${this.$route.params.level}`).default
                } catch (err) {
                    output = { files: this.randomFromArray(filePool) }
                }
                output.files.map(file => this.$store.commit('ADD_FILE', file))

                for (let i = 0; i < this.$route.params.step || 0; i++) {
                    this.$store.commit('INCREMENT_TOTAL_SUBMITTED')
                }
                // Kick tutorial loop
                if (this.$route.params.level === '1' || this.$route.params.level === '2') {
                    if (!this.$route.params.step) {
                        setTimeout(() => {
                            this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[0].req)
                        }, 1000)
                    }
                } else {
                    this.$store.commit('ADD_REQUEST', new Request())
                    this.runLoop()
                }
            },
            runLoop () {
                // the higher the level, the faster the spawn rate
                const timeUnit = (1 / this.$route.params.level) * 20000
                // Kick main game loop
                this.loop = setTimeout(() => {
                    this.$store.commit('ADD_REQUEST', new Request())
                    this.runLoop()
                }, Math.random() * timeUnit)
            },
            startCountdown () {
                this.$store.commit('SET_TOTAL_SUBMITTED', 0)
                this.$store.commit('SET_MESSAGE', '3')
                setTimeout(() => {
                    this.$store.commit('SET_MESSAGE', '2')
                }, 1000)
                setTimeout(() => {
                    this.$store.commit('SET_MESSAGE', '1')
                }, 2000)
                setTimeout(() => {
                    this.$store.commit('SET_MESSAGE', 'GO!')
                }, 3000)
                setTimeout(() => {
                    this.setupLevel()
                }, 4000)
            }
        },
        computed: {
            currentScriptedEvents () {
                return this.scriptedEvents ? this.scriptedEvents[this.$route.params.level - 1].requests : false
            },
            totalSubmitted () {
                return this.$store.state.totalSubmitted
            }
        },
        watch: {
            totalSubmitted (newVal) {
                setTimeout(() => {
                    if (this.currentScriptedEvents.length <= newVal) {
                        this.$store.commit('ADD_REQUEST', new Request(this.$route.params.level === '1' ? 'GET' : ['GET', 'POST']))
                        return
                    }

                    this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[newVal].req)
                        // Run any callbacks
                    if (this.currentScriptedEvents[newVal].callback) {
                        this.currentScriptedEvents[newVal].callback()
                    }
                }, Math.random() * 2000)

                // only on level 2
                if (this.$route.params.level === '2') {
                    // covers 3 training rounds + 5 correct answers
                    if (newVal >= 6) {
                        this.$store.commit('SET_MESSAGE', 'Level complete!')
                    }
                }
            },
            '$store.state.score' (newVal) {
                // only on level 1
                if (this.$route.params.level === '1') {
                    // covers 3 training rounds + 5 correct answers
                    if (newVal >= 8) {
                        this.$store.commit('SET_MESSAGE', 'Level complete!')
                    }
                }
            },
            '$route.params.level' (newVal) {
                if (parseInt(newVal) >= 3) {
                    this.startCountdown()
                } else {
                    this.setupLevel()
                }
            }
        }
    }
</script>

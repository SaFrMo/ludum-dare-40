<template>
    <div class="game-engine"></div>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels'
    export default {
        mounted () {
            if (this.$route.params.level === '1') {
                setTimeout(() => {
                    this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[0].req)
                }, 1000)
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
                        this.$store.commit('ADD_REQUEST', this.currentScriptedEvents[newVal].req)
                    }, 2500)
                }
            }
        }
    }
</script>

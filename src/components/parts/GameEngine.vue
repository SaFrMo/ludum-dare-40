<template>
    <div class="game-engine"></div>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels'
    export default {
        mounted () {
            setTimeout(() => {
                this.currentScriptedEvents.map(evt => {
                    console.log(evt.req)
                    this.$store.commit('ADD_REQUEST', evt.req)
                })
            }, 1000)
        },
        props: {
            'scripted-events': { type: Object }
        },
        computed: {
            currentScriptedEvents () {
                return scriptedEvents[this.$route.params.level - 1]
            }
        }
    }
</script>

<template>
    <div class="game-engine"></div>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels'
    export default {
        mounted () {
            this.currentScriptedEvents.map(evt => {
                console.log(evt.req)
                this.$store.commit('ADD_REQUEST', evt.req)
            })
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

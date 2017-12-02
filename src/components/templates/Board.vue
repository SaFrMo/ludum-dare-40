<template>
    <main class="board">

        <game-engine/>

        <req-res/>

        <staging-area/>

        <file-browser/>

    </main>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels'

    export default {
        components: {
            'game-engine': require('@/components/parts/GameEngine').default,
            'req-res': require('@/components/parts/ReqRes').default,
            'staging-area': require('@/components/parts/StagingArea').default,
            'file-browser': require('@/components/parts/FileBrowser').default,
            'tool-tip': require('@/components/parts/Tooltip').default
        },
        computed: {
            currentLevelEvents () {
                return scriptedEvents[this.$route.params.level]
            }
        }
    }
</script>

<style lang="scss">

    .board {
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: space-between;

        & > section {
            height: 100%;
            width: calc(100% / 3);
            padding: 20px;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & > section > div {
            position: relative;
        }
        .instructions {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 1em;
            margin: auto;
        }
    }

</style>

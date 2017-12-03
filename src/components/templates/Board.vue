<template>
    <main class="board">

        <game-engine/>

        <req-res/>

        <staging-area/>

        <file-browser/>

        <div class="meta">
            <h2 class="score">Score: {{ $store.state.score }} / {{ $store.state.totalSubmitted }}</h2>
            <div class="time">Time: {{ timerValue }}</div>
        </div>

        <transition-fade>
            <div class="message" v-if="$store.state.message">
                <div v-html="$store.state.message"></div>
                <router-link :to="`/level-${ parseInt(this.$route.params.level) + 1 }`">Next Level</router-link>
            </div>
        </transition-fade>

    </main>
</template>

<script>
    import scriptedEvents from '@/gameplay/levels/level1'

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
            },
            timerValue () {
                const rawValue = this.$store.state.timerOn
                    ? Date.now() - this.$store.state.timerStart
                    : this.$store.state.timerStop - this.$store.state.timerStart

                return rawValue
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
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .meta {
            position: fixed;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            margin: 0;
            padding: 20px;

            h2 {
                margin-top: 0;
            }
        }

        .message {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .message a {
            margin-top: 20px;
            background-color: #fff;
            color: #000;
            padding: 10px;
            text-decoration: none;
            transition: color 0.4s, background-color 0.4s;

            &:hover, &:focus {
                background-color: #000;
                color: #fff;
            }
        }
    }

</style>

<template>

    <section class="staging-area">
        <div class="staging">

            <transition-fade>
                <div class="instructions" key="instructions" v-if="!$store.state.staging">
                    Click a request to build its response here.
                </div>

                <div class="work-area" key="work-area" v-else>
                    <div class="label">
                        <span class="code">{{ staging.command }}</span>
                        <span class="path">{{ staging.path }}</span>
                    </div>

                    <ul class="files">
                        <li class="file" v-for="(file, i) in staging.files" :key="file.id">
                            <span class="name">{{ file }}</span>
                            <span class="exit" @click="$store.commit('REMOVE_FILE_FROM_STAGING', i)">X</span>
                        </li>
                    </ul>

                    <div class="controls">
                        <button>File doesn't exist</button>
                        <button>File is locked</button>
                        <button @click="$store.commit('MOVE_TO_RECEIVING', staging)">Send back to queue</button>
                        <button class="submit">Submit</button>
                    </div>
                </div>
            </transition-fade>

        </div>

        <div class="cache">

        </div>
    </section>

</template>

<script>
    export default {
        computed: {
            staging () {
                return this.$store.state.staging
            }
        }
    }
</script>

<style lang="scss">

    @import 'src/styles/vars';

    #app .staging-area {
        background-color: $center-bg;

        & > div {
            height: calc(50% - 10px);
            background-color: rgba(0, 0, 0, 0.2);
            overflow-x: hidden;
            position: relative;
        }
        & > div + div {
            margin-top: 20px;
        }

        .work-area {
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .label {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 10px;
        }
        .label .code {
            font-size: 24px;
            margin-bottom: 5px;
        }
        .controls {
            padding: 10px;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .controls button {
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 10px;
            width: calc((100% / 3) - 5px);
        }
        .controls .submit {
            width: 100%;
            font-size: 24px;
            margin-bottom: 0;
        }
    }

</style>

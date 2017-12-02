<template>

    <section class="staging-area">
        <div class="staging">

            <transition-fade>
                <div class="instructions" key="instructions" v-if="!$store.state.staging && $store.state.requests.length">
                    Click a request to build its response here.
                </div>

                <div class="work-area" key="work-area" v-else-if="$store.state.staging">
                    <div class="label">
                        <span class="code">{{ staging.command }}</span>
                        <span class="path">{{ staging.path }}</span>
                    </div>

                    <div class="request-headers" v-if="$store.state.staging.headers.length">
                        <span>Request Headers:</span>
                        <ul>
                            <li v-for="(header, i) in $store.state.staging.headers" :key="i">
                                <h2>{{ header.label }}</h2>
                                <div v-html="header.stagingValue || header.value"></div>
                            </li>
                        </ul>
                    </div>

                    <div class="response-building">

                        <h2>Response</h2>

                        <div class="code-wrap">
                            <h3>Code</h3>
                            <span>200 OK</span>
                        </div>

                        <div class="files-wrap" v-if="staging.files.length">
                            <h3>Files</h3>
                            <ul class="files">
                                <li class="file" v-for="(file, i) in staging.files" :key="file.id">
                                    <span class="name">{{ file }}</span>
                                    <span class="exit" @click="$store.commit('REMOVE_FILE_FROM_STAGING', i)">X</span>
                                </li>
                            </ul>
                        </div>
                        <div v-else class="instructions">
                            Click on files in the hard drive to add them to your response.
                        </div>

                    </div>

                    <div class="controls">
                        <button>File doesn't exist</button>
                        <button>File is locked</button>
                        <button @click="$store.commit('MOVE_TO_RECEIVING', staging)">Send back to queue</button>
                        <button class="submit" @click="$store.commit('MOVE_TO_OUTPUT')">Submit</button>
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

        & > .staging {
            height: calc(75% - 10px);
        }
        & > .cache {
            height: calc(25% - 10px);
        }
        & > div {
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
        .request-headers {
            text-align: left;
            margin: 10px;
        }
        .request-headers h2 {
            font-size: 18px;
            font-family: monospace;
            margin: 5px auto;
        }
        .response-building {
            background-color: rgba(0, 0, 0, 0.4);
            margin: 0 10px 20px;
            border-radius: 5px;
            position: relative;
            color: #fff;
            padding: 10px;

            flex: 1;

            h2 {
                margin: 10px auto;
            }
            .code-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .code-wrap h3 {
                margin: 0;
            }
        }
        .files-wrap {
            padding: 0 0 10px;
            display: flex;
            justify-content: space-between;

            h3 {
                text-align: left;
                margin: 0 0 10px;
            }
            .files {
                display: flex;
                justify-content: flex-end;
            }
            .file {
                display: flex;
                justify-content: space-between;
            }
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

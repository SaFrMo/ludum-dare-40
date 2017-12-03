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
                                <div :class="['value-wrap', { 'is-auth-header': header.label === 'Authorization' }]">
                                    <div class="key-svg" v-if="header.label === 'Authorization'" v-html="keySvg"></div>
                                    <div v-html="header.stagingValue || header.value"></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="request-body" v-if="$store.state.staging.body">
                        <span class="body-label">Request Body:</span>
                        <div class="body-content" v-html="$store.state.staging.body"></div>
                    </div>

                    <div class="response-building">

                        <h2>Response</h2>

                        <div class="code-wrap">
                            <h3>Code</h3>
                            <span>{{ staging.code }}</span>
                        </div>

                        <h3 class="response-body-label" v-if="staging.files.length || staging.responseBody.length">Body</h3>
                        <div class="response-body-wrap" v-if="staging.responseBody.length">
                            <h4>Meta</h4>
                            <ul class="lines">
                                <li class="line" v-for="(line, i) in staging.responseBody" :key="i">
                                    <span class="name" v-html="line"></span>
                                    <span class="exit" @click="$store.commit('UNDO_POST_DATA', i)">X</span>
                                </li>
                            </ul>
                        </div>

                        <div class="files-wrap" v-if="staging.files.length">
                            <h4>Files</h4>
                            <ul class="files">
                                <li class="file" v-for="(file, i) in staging.files" :key="i">
                                    <span class="name">{{ file }}</span>
                                    <span class="exit" @click="$store.commit('REMOVE_FILE_FROM_STAGING', i)">X</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div class="controls">
                        <button
                            @click="staging.files = []; $store.commit('SET_RESPONSE_CODE', '403 Forbidden')"
                            v-if="parseInt($route.params.level) >= 2 && $store.state.totalSubmitted >= 3">403 Forbidden</button>
                        <button @click="staging.files = []; $store.commit('SET_RESPONSE_CODE', '404 Not Found')">404 Not Found</button>
                        <!-- <button>File is locked</button> -->
                        <button @click="$store.commit('MOVE_TO_RECEIVING', staging)">Send back to queue</button>
                        <button class="submit" @click="submit">Submit</button>
                    </div>
                </div>
            </transition-fade>

        </div>

        <div class="cache">

        </div>
    </section>

</template>

<script>
    import keySvg from '@/assets/key.svg'
    export default {
        data () {
            return {
                keySvg
            }
        },
        computed: {
            staging () {
                return this.$store.state.staging
            }
        },
        methods: {
            submit () {
                this.$store.commit('MOVE_TO_OUTPUT')
                setTimeout(() => {
                    this.$store.commit('REMOVE_OLDEST_OUTPUT')
                }, 3000)
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
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            min-height: 27px;
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
        .request-headers .is-auth-header.value-wrap {
            display: flex;
            justify-content: space-between;
            padding: 5px;
            background-color: rgba(0, 0, 0, 0.7);
            align-items: flex-end;
            color: #0c0;
            font-size: 16px;
            font-family: monospace;

            .key-svg {
                display: flex;
                align-items: center;
            }
            svg {
                width: 32px;
                height: 32px;
            }
        }
        .request-body {
            text-align: left;
            margin: 10px;
        }
        .request-body .body-label {
            margin-bottom: 10px;
            display: block;
        }
        .request-body .body-content {
            background-color: #000;
            color: #fff;
            font-family: monospace;
            padding: 10px;
            font-size: 16px;
        }
        .response-building {
            background-color: rgba(0, 0, 0, 0.4);
            margin: 20px 10px;
            border-radius: 5px;
            position: relative;
            color: #fff;
            padding: 10px;

            flex: 1;

            h2 {
                margin: 0 auto 5px;
            }
            h4 {
                margin: 0 auto 10px;
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
        .files-wrap,
        .response-body-wrap {
            padding: 0 0 10px;

            h3 {
                text-align: left;
                margin: 0 0 10px;
            }
            .files,
            .lines {
                margin-top: 3px;
                padding: 0;
                display: flex;
                align-items: flex-end;
                flex-direction: column;
            }
            .file,
            .line {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 10px;
                text-align: left;
            }
            .file code,
            .line code {
                background-color: #000;
                padding: 0 5px;
                font-size: 16px;
                // color: #0c0;
            }
            .file .exit,
            .line .exit {
                background-color: rgba(0, 0, 0, 0.4);
                padding: 0 5px;
                margin-left: 10px;
                transition: background-color 0.4s, color 0.4s;
                cursor: pointer;

                &:hover, &:focus {
                    background-color: #fff;
                    color: #000;
                }
            }
        }
        .response-body-label {
            text-align: left;
            margin: 5px 0;
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
            transition: color 0.4s, background-color 0.4s;
            cursor: pointer;

            &:hover, &:focus {
                background-color: #000;
                color: #fff;
            }
        }
        .controls .submit {
            width: 100%;
            font-size: 24px;
        }
    }

</style>

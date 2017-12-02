<template>

    <section class="req-res">

        <div class="receiving">

            <transition-fade>
                <div class="instructions" v-if="!$store.state.requests.length">
                    Incoming requests will appear here. Wait for more to arrive.
                </div>
            </transition-fade>

            <transition-group name="slide-in">
                <div
                    class="single-request"
                    v-for="(request, i) in $store.state.requests"
                    :key="i"
                    @click="$store.commit('MOVE_TO_STAGING', request)">

                    <div class="label">
                        Request
                    </div>

                    <div class="content">
                        <div :class="['request-line', { 'has-border': request.headers.length || request.body }]">
                            <span class="code">{{ request.command }}</span>
                            <span class="path">{{ request.path }}</span>
                        </div>

                        <div class="fields" v-if="request.headers.length || request.body">
                            <div class="headers" v-if="request.headers.length">
                                <!-- <span>Headers:</span> -->
                                <ul>
                                    <li v-for="(header, i) in request.headers" :key="i">
                                        <h2>{{ header.label }}</h2>
                                        <div>{{ header.value }}</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="body" v-if="request.body">Body: {{ request.body }}</div>
                        </div>
                    </div>

                </div>
            </transition-group>
        </div>

        <div class="output">

            <transition-fade>
                <div class="instructions" v-if="!$store.state.output.length && $store.state.staging">
                    Click 'Submit' when your response is ready.
                </div>
            </transition-fade>

            <transition-group name="slide-in-right" appear>
                <div class="single-response"
                    v-for="(response, i) in $store.state.output"
                    :key="response.id"
                    >
                    <div class="label">
                        Response
                    </div>

                    <div class="content">
                        <div :class="['request-line', 'has-border']">
                            <span class="code">{{ response.code }}</span>
                        </div>

                        <div class="fields" v-if="response.headers.length || response.files.length">
                            <!-- <div class="headers" v-if="response.headers.length">Headers: {{ response.headers }}</div> -->
                            <div class="body" v-if="response.files.length">
                                <span>Files:</span>
                                <ul>
                                    <li v-for="(file, i) in response.files" :key="i">
                                        {{ file }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="validation-wrap">
                        <div class="validation" v-html="getValidation(response)"></div>
                    </div>

                </div>
            </transition-group>

        </div>
    </section>

</template>

<script>
    import fail from '@/assets/thumb-down.svg'
    import succeed from '@/assets/thumb-up.svg'

    export default {
        methods: {
            getValidation (response) {
                if (response.validated === -1) {
                    response.validate()
                    if (response.validated > 0) {
                        this.$store.commit('CHANGE_SCORE_BY', 1)
                    }
                    this.$store.commit('INCREMENT_TOTAL_SUBMITTED')
                }

                return response.validated > 0 ? succeed : fail
            }
        }
    }
</script>

<style lang="scss">

    @import 'src/styles/vars';

    #app .req-res {
        background-color: $left-bg;
        color: #fff;

        & > div {
            height: calc(50% - 10px);
            background-color: darken($left-bg, 15%);
            overflow-x: hidden;
        }

        // Request
        .single-request {
            background-color: darken($left-bg, 25%);
            box-sizing: border-box;
            // border-radius: 5px;
            width: 100%;
            cursor: pointer;
            user-select: none;
            margin-bottom: 10px;

            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .label {
                text-align: right;
                text-transform: uppercase;
                font-size: 14px;
                background-color: #fff;
                color: #000;
                display: inline-block;
                padding: 0 10px;

                transition: background-color 0.4s;
            }
            &:hover .label,
            &:focus .label {
                background-color: #ddd;
            }
            .content {
                padding: 5px 10px 10px;
            }
        }
        .request-line {
            padding: 5px;
            width: 100%;
            box-sizing: border-box;

            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .request-line.has-border {
            padding-bottom: 10px;
            border-bottom: 2px solid #fff;
        }
        .request-line .code {
            text-align: left;
            font-size: 24px;
        }
        .request-line .path {
            text-align: right;
        }
        .fields {
            padding: 10px 5px;
            text-align: left;
        }
        .headers h2 {
            font-size: 18px;
            font-family: monospace;
            margin: 5px auto;
        }

        // Response
        .single-response {
            @extend .single-request;
            ul {
                margin: 5px auto 0;
            }
            .validation-wrap {
                display: flex;
                justify-content: flex-end;
            }
            .validation {
                width: 75px;
                height: 75px;
                background-color: rgba(0, 0, 0, 0.4);
                margin: 0 10px 10px;
                position: relative;
            }
            .validation svg {
                width: 100%;
                height: auto;
                margin: auto;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
        }

        // Output
        .output {
            margin-top: 20px;
        }
    }

</style>

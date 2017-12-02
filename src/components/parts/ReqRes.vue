<template>

    <section class="req-res">

        <div class="receiving">

            <transition-fade>
                <div class="instructions" v-if="!$store.state.requests.length">
                    Incoming requests will appear here.
                </div>
            </transition-fade>

            <transition name="slide-in">
                <div
                    class="single-request"
                    v-for="(request, i) in $store.state.requests"
                    :key="request.id"
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
                            <div class="headers" v-if="request.headers.length">Headers: {{ request.headers }}</div>
                            <div class="body" v-if="request.body">Body: {{ request.body }}</div>
                        </div>
                    </div>

                </div>
            </transition>
        </div>

        <div class="output">

            <transition-fade>
                <div class="instructions" v-if="!$store.state.cache.length">
                    Drag a complete response here to send it back to the user.
                </div>
            </transition-fade>

        </div>
    </section>

</template>

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
        }
        .single-request .label {
            text-align: right;
            text-transform: uppercase;
            font-size: 14px;
            background-color: #fff;
            color: #000;
            display: inline-block;
            padding: 0 5px;

            transition: background-color 0.4s;
        }
        .single-request:hover .label,
        .single-request:focus .label {
            background-color: #ddd;
        }
        .single-request .content {
            padding: 5px 10px 10px;
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
        .output {
            margin-top: 20px;
        }
    }

</style>

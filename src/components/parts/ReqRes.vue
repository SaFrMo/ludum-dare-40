<template>

    <section class="req-res">
        <button
            class="single-request"
            v-for="(request, i) in $store.state.requests"
            :key="request.id"
            @click="$store.commit('SET_SELECTED', request)">

            <div class="request-line">
                <span class="code">{{ request.command }}</span>
                <span class="path">{{ request.path }}</span>
            </div>


        </button>
    </section>

</template>

<style lang="scss">

    @import 'src/styles/vars';

    #app .req-res {
        background-color: $left-bg;

        .single-request {
            background-color: rgba(255, 255, 255, 0.4);
            display: flex;
            flex-direction: column;
            padding: 10px 20px;
        }
        .request-line {
            background-color: rgba(0, 0, 0, 0.4);
            padding: 5px;
            border-radius: 3px;
            color: #fff;
        }
        .request-line span {
            display: block;
            width: 100%;
        }
        .request-line .code {
            text-align: left;
        }
        .request-line .path {
            text-align: right;
        }
    }

</style>

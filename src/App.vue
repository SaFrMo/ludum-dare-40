<template>
    <div id="app">
        <transition-fade>
            <router-view class="router-view"/>
        </transition-fade>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        margin: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        button {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            appearance: none;
            border-radius: 0;
            border: none;
            outline-color: transparent;
            background-color: transparent;
        }
        .code {
            font-family: monospace;
        }

        // Slide
        .slide-in-enter {
            transform: translateX(-100%);
        }
        .slide-in-leave-to {
            transform: translateX(100%);
        }
        .slide-in-enter-active, .slide-in-leave-active {
            transition: transform 0.6s;
        }
    }
    .router-view {
        position: absolute;
    }
</style>

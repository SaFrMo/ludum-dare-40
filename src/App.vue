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

<style>
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
    }
    .router-view {
        position: absolute;
    }
</style>

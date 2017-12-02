<template>

    <transition name="fade" appear>
        <slot/>
    </transition>

</template>

<style lang="scss">

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.4s;
    }

</style>

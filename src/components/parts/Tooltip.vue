<template>

    <transition-fade>
        <section class="tooltip tool-tip" v-if="$store.state.tooltip">
            {{ $store.state.tooltip }}
        </section>
    </transition-fade>

</template>

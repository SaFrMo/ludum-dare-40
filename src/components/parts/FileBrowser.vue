<template>

    <section class="file-browser">
        <file-directory :tree="$store.state.files"/>
    </section>

</template>

<style lang="scss">

    @import 'src/styles/vars';

    .file-browser {
        background-color: $right-bg;
    }

</style>

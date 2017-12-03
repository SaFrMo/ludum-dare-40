<template>

    <section class="file-browser">
        <file-directory :tree="$store.state.files"/>
    </section>

</template>

<style lang="scss">

    // .file-browser {
    //     height: calc(100% - 180px);
    //     overflow-y: auto;
    // }

</style>

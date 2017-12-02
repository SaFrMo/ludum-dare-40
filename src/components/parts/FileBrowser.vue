<template>

    <section class="file-browser">
        <file-directory :tree="files"/>
    </section>

</template>

<script>
    import files from '@/gameplay/files'

    export default {
        data () {
            return {
                files
            }
        }
    }
</script>

<style lang="scss">

    @import 'src/styles/vars';

    .file-browser {
        background-color: $right-bg;
    }

</style>

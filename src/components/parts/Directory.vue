<template>
    <ul class="directory">
        <li v-for="file in tree">
            <span v-if="typeof file === 'string'">{{ file }}</span>
            <div v-else>
                <span>{{ file.name }}</span>
                <file-directory :tree="file.files"/>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            tree: {
                type: Array,
                default: []
            }
        }
    }
</script>

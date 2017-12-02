<template>
    <ul class="directory">
        <li v-for="file in tree">
            <div
                v-if="typeof file === 'string'"
                @click="$store.commit('ADD_FILE_TO_STAGING', file)">
                {{ file }}
            </div>
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

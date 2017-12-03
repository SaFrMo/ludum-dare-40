<template>
    <ul class="directory">
        <li v-for="file in tree">
            <div
                v-if="typeof file === 'string'"
                @click="$store.commit('SET_RESPONSE_CODE', '200 OK'); $store.commit('ADD_FILE_TO_STAGING', file)">
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
        },
        computed: {
            // computedTree () {
            //     const output = [{ name: '/', dirs: [], files: [] }]
            //
            //     this.tree.map(entry => {
            //         const arr = entry.split('/')
            //         arr.pop()
            //
            //     })
            //
            //     return output
            // }
        }
    }
</script>

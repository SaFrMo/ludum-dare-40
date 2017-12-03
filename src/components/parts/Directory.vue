<template>
    <ul class="directory">
        <li v-for="file in tree">
            <div class="file-wrapper" v-if="typeof file === 'string' || file.auth">
                <span class="filename" v-html="getFile(file)"></span>
                <div class="file-controls-wrap">
                    <button @click="addFile(file)">Add to Response</button>
                    <button v-if="$route.params.level > 1" @click="postData(file)">Post Data</button>
                </div>

                <span class="authentication" v-if="file.auth">
                    <div class="svg-wrap" v-html="padlock"></div>
                    <span>{{ file.auth }}</span>
                </span>
            </div>
            <div v-else>
                <span>{{ file.name }}</span>
                <file-directory :tree="file.files"/>
            </div>
        </li>
    </ul>
</template>

<script>
    import padlock from '@/assets/padlock.svg'
    export default {
        data () {
            return {
                padlock
            }
        },
        props: {
            tree: {
                type: [Object, Array],
                default: () => {}
            }
        },
        methods: {
            addFile (file) {
                this.$store.commit('SET_RESPONSE_CODE', '200 OK')
                this.$store.commit('ADD_FILE_TO_STAGING', file)
            },
            postData (file) {
                this.$store.commit('SET_RESPONSE_CODE', '200 OK')
                this.$store.commit('POST_DATA', file)
            },
            getFile (file) {
                if (typeof file === 'string') return file

                return file.name
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

<style lang="scss">

    .directory {
        list-style-type: none;
        padding: 0;
        text-align: left;


        .file-wrapper {
            background-color: rgba(0, 0, 0, 0.4);
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
        .filename {
            display: block;
            background-color: #fff;
            padding: 5px;
            font-size: 18px;
        }
        .file-controls-wrap {
            text-align: right;
            margin-bottom: 10px;
        }
        .file-controls-wrap button {
            font-size: 16px;
            background-color: #fff !important;
            margin: 0 5px;
            transition: color 0.4s, background-color 0.4s;
            cursor: pointer;

            &:hover, &:focus {
                background-color: #000 !important;
                color: #fff;
            }
        }
        .file-controls-wrap button:last-child {
            margin: 0;
        }
        .authentication {
            margin: 10px;
            background-color: rgba(0, 0, 0, 0.4);
            padding: 5px;
            color: #0c0;

            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .svg-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            svg {
                width: 32px;
                height: 32px;
            }
        }
    }

</style>

<template>
    <ul class="directory">
        <li v-for="file in tree">
            <div class="file-wrapper" v-if="typeof file === 'string' || file.auth">
                <span class="filename" v-html="getFile(file)"></span>
                <div class="file-controls-wrap">
                    <button @click="addFile(file)">
                        <span class="button-content-wrap">
                            <span class="svg-wrap" v-html="hand"></span>
                            <span class="command">GET</span>
                        </span>
                    </button>
                    <button v-if="$route.params.level > 1" @click="postData(file)">
                        <span class="button-content-wrap">
                            <span class="svg-wrap" v-html="pencil"></span>
                            <span class="command">POST</span>
                        </span>
                    </button>
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
    import hand from '@/assets/open-palm.svg'
    import pencil from '@/assets/pencil.svg'
    export default {
        data () {
            return {
                padlock,
                hand,
                pencil
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
        }
    }
</script>

<style lang="scss">

    .directory {
        list-style-type: none;
        padding: 0;
        text-align: left;
        margin: 0;

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
            margin-top: 10px;
            text-align: right;
        }
        .file-controls-wrap button {
            font-size: 16px;
            background-color: #fff !important;
            margin: 0 20px;
            transition: color 0.4s, background-color 0.4s;
            padding: 0 !important;
            cursor: pointer;

            &:hover, &:focus {
                background-color: #000 !important;
                color: #fff;
            }
            .button-content-wrap {
                display: flex;
                align-items: center;

                .svg-wrap {
                    display: block;
                    width: 48px;
                    height: 48px;
                    background-color: rgba(0, 0, 0, 0.8);
                    margin-right: 15px;
                    padding: 5px;
                }
                .command {
                    margin-right: 15px;
                }
            }
        }
        .file-controls-wrap button:last-child {
            margin: 0;
        }
        .authentication {
            margin: 10px 10px 0;
            background-color: rgba(0, 0, 0, 0.55);
            padding: 5px;
            color: #0c0;
            font-size: 16px;
            font-family: monospace;

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

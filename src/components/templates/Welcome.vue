<template>
    <main class="welcome-template">
        <h1>http: the game</h1>

        <transition-group name="slide" appear mode="out-in">
            <section
                v-for="(slide, i) in welcomeSpeech"
                v-if="index == i"
                :key="i"
                class="message">
                {{ currentSlide }}
            </section>
        </transition-group>

        <div class="button-wrap">

            <button :disabled="index <= 0" @click="index--">Back</button>
            <button :disabled="index >= welcomeSpeech.length" @click="index++">Next</button>

        </div>
    </main>
</template>

<script>
import welcomeSpeech from '@/assets/welcomeSpeech'

export default {
    data () {
        return {
            welcomeSpeech,
            index: 0
        }
    },
    computed: {
        currentSlide () {
            return this.welcomeSpeech[this.index]
        }
    },
    watch: {
        index (newVal) {
            if (newVal >= this.welcomeSpeech.length) {
                this.$router.push('level-1')
            }
        }
    }
}
</script>

<style lang="scss">

    .welcome-template {
        max-width: 550px;
        margin: auto;
        padding: 40px;

        .message {
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .button-wrap {
            margin-top: 40px;
        }
    }

    // slideshow
    .slide-enter, .slide-leave-to {
        transform: translateY(30px);
        opacity: 0;
    }
    .slide-leave-active {
        position: absolute;
        right: 0;
        left: 0;
        max-width: 550px;
        margin: auto;
    }
    .slide-enter-active, .slide-leave-active {
        transition: transform 0.4s, opacity 0.4s;
    }

</style>

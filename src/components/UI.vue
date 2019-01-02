<template>
    <div class="ui">
        <div v-if="!isStarted">
            <button v-on:click="start">Start Game</button>
            <br>
            <button v-on:click="quit">Quit</button>
        </div>

        <button v-on:click="draw" v-if="isStarted && !isSpinning && isFirstTry">Spin the wheel</button>
        <button v-on:click="drawAgain" v-if="isStarted && !isSpinning && !isFirstTry">Try again</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UI extends Vue {
    @Prop() private draw!: () => void;
    @Prop() private drawAgain!: () => void;
    @Prop() private start!: () => void;
    @Prop() private quit!: () => void;

    constructor() {
        super();
    }

    get isStarted() {
        return this.$store.state.wheelOfFortuneStore.isStarted;
    }
    get isSpinning() {
        return this.$store.state.wheelOfFortuneStore.isSpinning;
    }
    get isFirstTry() {
        return this.$store.state.wheelOfFortuneStore.tries == 0;
    }
}
</script>

<style scoped lang="scss">
.ui {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    text-align: center;
    padding-top: 20%;
}

button {
    border: 4px solid rgb(211, 22, 228);
    background: #06003a;
    color: rgb(211, 22, 228);
    font-size: 20px;
    font-weight: 400;
    font-family: "Press Start 2P";
    padding: 10px;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background: lighten(#06003a, 10%);
    }

    &:active,
    &:focus {
        outline: 0;
        -moz-outline-style: none;
    }
}
</style>

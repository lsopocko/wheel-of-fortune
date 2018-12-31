<template>
    <div class="ui">
        <button v-on:click="start">Start Game</button>
        <button v-on:click="spin">Spin the wheel</button>
        <button v-on:click="stop">Stop</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UI extends Vue {
    constructor() {
        super();
    }

    start(): void {
        this.$store.dispatch("WheelOfFortuneStore/start");
    }

    spin(): void {
        this.$store.dispatch("WheelOfFortuneStore/spin");
    }

    stop(): void {
        this.$store.dispatch("WheelOfFortuneStore/stop");
    }
}
</script>

<style lang="scss">
</style>

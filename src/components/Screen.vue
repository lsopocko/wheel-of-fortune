<template>
    <div class="screen">
        <div class="screen__background">
            <canvas
                v-on:click="start"
                class="screen__animation"
                ref="renderCanvas"
                width="1000"
                height="1000"
            ></canvas>
            
            <button v-on:click="start">Start Game</button>
            <button v-on:click="spin">Spin the wheel</button>
            <button v-on:click="stop">Stop</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WheelOfFortune from "@/modules/wheelOfFortune/WheelOfFortune";

@Component
export default class Screen extends Vue {
    private gameInstance?: WheelOfFortune;

    constructor() {
        super();
    }

    mounted(): void {
        this.gameInstance = new WheelOfFortune(
            <HTMLCanvasElement>this.$refs.renderCanvas,
            this.$store
        );
    }

    start(): void {
        if (typeof this.gameInstance !== "undefined") {
            this.gameInstance.start();
        }
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
.screen {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -500px;
    margin-left: -500px;
}
</style>

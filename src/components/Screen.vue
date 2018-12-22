<template>
    <div class="screen">
        <div class="screen__background">
            <canvas
                v-on:click="start"
                class="screen__animation"
                ref="renderCanvas"
                width="500"
                height="500"
            ></canvas>
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
        this.gameInstance = new WheelOfFortune(<HTMLCanvasElement>(
            this.$refs.renderCanvas
        ));
    }

    start(): void {
        if (typeof this.gameInstance !== "undefined") {
            this.gameInstance.start();
        }
    }
}
</script>

<style lang="scss">
.screen {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
}
</style>

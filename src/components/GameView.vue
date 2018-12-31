<template>
    <div class="screen">
        <div class="screen__background">
            <canvas class="screen__animation" ref="renderCanvas" width="1000" height="1000"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WheelOfFortune from "@/modules/wheelOfFortune/WheelOfFortune";

@Component
export default class GameView extends Vue {
    @Prop() private isStarted!: boolean;
    @Prop() private isSpinning!: boolean;

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

    @Watch("isStarted")
    onStateChange() {
        if (this.isStarted && typeof this.gameInstance !== "undefined") {
            this.gameInstance.start();
        }

        if (!this.isStarted && typeof this.gameInstance !== "undefined") {
            this.gameInstance.pause();
        }
    }

    @Watch("isSpinning")
    onSpinningChange() {
        if (this.isSpinning && typeof this.gameInstance !== "undefined") {
            this.gameInstance.spin();
        }
    }
}
</script>

<style lang="scss">
</style>

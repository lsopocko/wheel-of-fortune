<template>
    <div class="screen">
        <div class="screen__background">
            <canvas class="screen__animation" ref="renderCanvas"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WheelOfFortune } from "../modules/wheelOfFortune";

@Component
export default class GameView extends Vue {
    @Prop() private isStarted!: boolean;
    @Prop() private isShowingResults!: boolean;
    @Prop() private isSpinning!: boolean;
    @Prop() private results!: number[];

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
    onIsStartedChange() {
        if (this.isStarted && typeof this.gameInstance !== "undefined") {
            this.gameInstance.start();
        }
    }

    @Watch("isShowingResults")
    onIsShowingResultsChange() {
        if (this.isShowingResults && typeof this.gameInstance !== "undefined") {
            this.gameInstance.showResults();
        }
    }

    @Watch("results")
    onResultsChange() {
        if (typeof this.gameInstance !== "undefined") {
            this.gameInstance.spin();
        }
    }
}
</script>

<style lang="scss">
.screen {
    margin: auto;
}
</style>

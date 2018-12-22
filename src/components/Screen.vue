<template>
    <div class="screen">
        <div class="screen__background">
            <canvas class="screen__animation" ref="renderCanvas" width="500" height="500"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Wheel from "@/modules/wheel/wheel";
import * as PIXI from "pixi.js";

@Component
export default class Screen extends Vue {
    mounted(): void {
        const renderCanvas = this.$refs.renderCanvas as HTMLCanvasElement;

        const gameInstance = new Wheel(renderCanvas);
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

<template>
    <div class="wheel">
        <div class="wheel__background">
            <canvas class="wheel__animation" ref="renderCanvas" width="500" height="500"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as PIXI from "pixi.js";

@Component
export default class Wheel extends Vue {
    mounted(): void {
        // Determine the width and height of the renderer wrapper element.
        const renderCanvas = this.$refs.renderCanvas as HTMLCanvasElement;
        const w = renderCanvas.offsetWidth;
        const h = renderCanvas.offsetHeight;

        // Create a new PIXI app.
        const PIXIApp = new PIXI.Application(w, h, {
            view: renderCanvas,
            backgroundColor: 0xfafafa
        });

        const bunny = PIXI.Sprite.fromImage("./logo.png");

        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = PIXIApp.screen.width / 2;
        bunny.y = PIXIApp.screen.height / 2;

        PIXIApp.stage.addChild(bunny);

        // Listen for animate update
        PIXIApp.ticker.add(delta => {
            // console.log(bunny);
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            bunny.rotation += 0.1 * delta;
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wheel {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
}
</style>

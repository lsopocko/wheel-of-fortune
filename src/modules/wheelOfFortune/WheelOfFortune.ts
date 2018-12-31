import * as PIXI from "pixi.js";
import Scene from "./scenes/Scene";
import IntroScene from "./scenes/IntroScene";
import BroccoliScene from "./scenes/BroccoliScene";
import { Store } from "vuex";

import * as TWEEN from "@tweenjs/tween.js";

export default class WheelOfFortune extends PIXI.Application {
    private introScene: IntroScene;
    private broccoliScene: Scene;

    private static GAME_WIDTH = 1000;
    private static GAME_HEIGHT = 1000;

    private currentScene: Scene;

    /**
     * Create wheel of fortune game instance
     * @param renderCanvas - Canvas element used to render the game.
     */
    public constructor(
        renderCanvas: HTMLCanvasElement,
        private store: Store<any>
    ) {
        super(renderCanvas.offsetWidth, renderCanvas.offsetHeight, {
            view: renderCanvas,
            autoStart: false,
            resolution: window.devicePixelRatio,
            autoResize: true
        });

        this.introScene = new IntroScene(this.store);
        this.broccoliScene = new BroccoliScene(this.store);

        this.currentScene = this.introScene;
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        this.loadAssets();
        this.initalize();
    }

    public spin(): void {
        this.switchScene(this.introScene);
        this.introScene.spin();
    }

    public pause(): void {
        this.introScene.stop();
        this.switchScene(this.broccoliScene);
    }

    public loadAssets(): void {
        this.stage.addChild(this.currentScene);
    }

    private resize(): void {
        // Determine which screen dimension is most constrained
        const ratio = Math.min(
            window.innerWidth / WheelOfFortune.GAME_WIDTH,
            window.innerHeight / WheelOfFortune.GAME_HEIGHT
        );

        // Scale the view appropriately to fill that dimension
        this.stage.scale.x = this.stage.scale.y = ratio;

        // Update the renderer dimensions
        this.renderer.resize(
            Math.ceil(WheelOfFortune.GAME_WIDTH * ratio),
            Math.ceil(WheelOfFortune.GAME_HEIGHT * ratio)
        );
    }

    private switchScene(newScene: Scene) {
        this.stage.removeChild(this.currentScene);
        this.stage.addChild(newScene);
        this.currentScene = newScene;
    }

    private initalize(): void {
        this.ticker.add(this.update.bind(this));
    }

    private update(delta: number): void {
        this.currentScene.update(delta);
        TWEEN.update();
    }
}

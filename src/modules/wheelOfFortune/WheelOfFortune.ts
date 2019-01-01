import * as PIXI from "pixi.js";
import Scene from "./scenes/Scene";
import SpinningReelsScene from "./scenes/SpinningReelsScene";
import { Store } from "vuex";

import * as TWEEN from "@tweenjs/tween.js";
import ResultsScene from "./scenes/ResultsScene";

export default class WheelOfFortune extends PIXI.Application {
    private spinningReelsScene: SpinningReelsScene;
    private resultsScene: ResultsScene;

    private static GAME_WIDTH = 1000;
    private static GAME_HEIGHT = 1000;
    private static PADDING = 10;

    private currentScene: Scene;

    /**
     * Create wheel of fortune game instance
     * @param renderCanvas - canvas element used to render the game.
     * @param store - state management
     */
    public constructor(
        renderCanvas: HTMLCanvasElement,
        // @todo this should typed better
        private store: Store<{}>
    ) {
        super(WheelOfFortune.GAME_WIDTH, WheelOfFortune.GAME_HEIGHT, {
            view: renderCanvas,
            autoStart: false,
            resolution: window.devicePixelRatio,
            autoResize: true
        });

        this.spinningReelsScene = new SpinningReelsScene(this.store);
        this.resultsScene = new ResultsScene(this.store);

        this.currentScene = this.spinningReelsScene;
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        this.loadAssets();
    }

    public spin(): void {
        this.switchScene(this.spinningReelsScene);
    }

    public showResults(): void {
        this.switchScene(this.resultsScene);
    }

    public loadAssets(): void {
        const loader = PIXI.loader;

        loader
            .add("./assets/symbols/fries.png")
            .add("./assets/symbols/cake.png")
            .add("./assets/symbols/soda.png")
            .add("./assets/symbols/steak.png")
            .add("./assets/symbols/broccoli.png")
            .load(this.initalize.bind(this));
    }

    private resize(): void {
        const ratio = Math.min(
            window.innerWidth / WheelOfFortune.GAME_WIDTH,
            window.innerHeight / WheelOfFortune.GAME_HEIGHT
        );

        this.stage.scale.x = this.stage.scale.y = ratio;

        this.renderer.resize(
            Math.ceil(WheelOfFortune.GAME_WIDTH * ratio) -
                WheelOfFortune.PADDING,
            Math.ceil(WheelOfFortune.GAME_HEIGHT * ratio) -
                WheelOfFortune.PADDING
        );
    }

    private switchScene(newScene: Scene) {
        const lastScene = this.currentScene;
        this.stage.removeChild(this.currentScene);
        this.stage.addChild(newScene);
        this.currentScene = newScene;
        this.currentScene.initialize();
        lastScene.reset();
    }

    private initalize(): void {
        this.stage.addChild(this.currentScene);
        this.ticker.add(this.update.bind(this));
    }

    private update(delta: number): void {
        this.currentScene.update(delta);
        // @todo find out whats wrong with delta and why it doesnt work when passing it to TWEEN
        TWEEN.update();
    }
}

import * as PIXI from "pixi.js";
import Scene from "./scenes/Scene";
import IntroScene from "./scenes/IntroScene";
import BroccoliScene from "./scenes/BroccoliScene";

export default class WheelOfFortune extends PIXI.Application {
    private introScene: Scene;
    private broccoliScene: Scene;

    private currentScene: Scene;

    /**
     * Create wheel of fortune game instance
     * @param renderCanvas - Canvas element used to render the game.
     */
    public constructor(renderCanvas: HTMLCanvasElement) {
        const w = renderCanvas.offsetWidth;
        const h = renderCanvas.offsetHeight;

        super(w, h, {
            view: renderCanvas,
            autoStart: false
        });

        this.introScene = new IntroScene();
        this.broccoliScene = new BroccoliScene();

        this.currentScene = this.introScene;

        setTimeout(() => {
            this.switchScene(this.broccoliScene);
        }, 5000);

        this.loadAssets();
        this.initalize();
    }

    public switchScene(newScene: Scene) {
        this.stage.removeChild(this.currentScene);
        this.stage.addChild(newScene);
        this.currentScene = newScene;
    }

    public loadAssets(): void {
        this.stage.addChild(this.currentScene);
    }

    private initalize(): void {
        this.ticker.add(this.update.bind(this));
    }

    private update(delta: number): void {
        this.currentScene.update(delta);
    }
}

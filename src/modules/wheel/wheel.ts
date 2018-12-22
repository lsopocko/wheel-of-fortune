import * as PIXI from "pixi.js";
import Bunny from "@/modules/wheel/entities/bunny";

export default class Wheel {
    private PIXIApp: PIXI.Application;
    private assets: any = {};

    /**
     * Create wheel of fortune game instance
     * @param renderCanvas - Canvas element used to render the game.
     */
    public constructor(renderCanvas: HTMLCanvasElement) {
        const w = renderCanvas.offsetWidth;
        const h = renderCanvas.offsetHeight;

        this.PIXIApp = new PIXI.Application(w, h, {
            view: renderCanvas
        });

        this.initalize();
    }

    public loadAssets(): void {
        this.assets["bunny"] = new Bunny();

        this.assets["bunny"].x = this.PIXIApp.screen.width / 2;
        this.assets["bunny"].y = this.PIXIApp.screen.height / 2;

        this.PIXIApp.stage.addChild(this.assets["bunny"]);
    }

    private initalize(): void {
        this.loadAssets();

        this.PIXIApp.ticker.add(this.update.bind(this));
    }

    private update(delta: number): void {
        this.assets["bunny"].rotation += 0.02 * delta;
    }
}

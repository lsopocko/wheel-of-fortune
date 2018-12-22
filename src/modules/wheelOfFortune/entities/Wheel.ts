import Fries from "../entities/Fries";
import Cake from "../entities/Cake";
import Broccoli from "./Broccoli";
import Steak from "./Steak";
import Soda from "./Soda";
import * as PIXI from "pixi.js";

export default class Wheel extends PIXI.Container {
    private static numberOfSymbols = 40;
    public readonly name: string = "wheel";

    constructor(private readonly radius: number) {
        super();

        this.setTransform(500, 500, 1, 1, 0, 0, 0, this.radius, this.radius);

        this.setupSymbols();
        this.setupBackground();
    }

    private setupBackground() {
        const backgroud = PIXI.Sprite.fromImage("./assets/wheel1.png");
        backgroud.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        backgroud.width = this.width;
        backgroud.height = this.height;
        backgroud.anchor.set(0.5);
        backgroud.x = this.width / 2;
        backgroud.y = this.height / 2;
    }

    private setupSymbols(): void {
        const step = (2 * Math.PI) / Wheel.numberOfSymbols;
        let angle = 0;

        const symbols = [Fries, Cake, Steak, Broccoli, Soda];

        let symbolIndex = 0;

        for (let i = 0; i < Wheel.numberOfSymbols; i++) {
            const symbol = new symbols[symbolIndex]();

            const x = this.radius + this.radius * Math.cos(angle) * -1;
            const y = this.radius + this.radius * Math.sin(angle) * -1;

            symbol.position.set(x, y);
            symbol.anchor.set(0.5);
            symbol.rotation = angle;

            this.addChild(symbol);

            if (symbolIndex < symbols.length - 1) {
                symbolIndex++;
            } else {
                symbolIndex = 0;
            }

            angle += step;
        }
    }
}

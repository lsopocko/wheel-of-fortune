import Fries from "./Fries";
import Cake from "./Cake";
import Broccoli from "./Broccoli";
import Steak from "./Steak";
import Soda from "./Soda";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class Wheel extends PIXI.Container {
    private tween: TWEEN.Tween;

    constructor(
        private readonly radius: number,
        public readonly name: string,
        private readonly symbols: string[]
    ) {
        super();

        this.setTransform(500, 500, 1, 1, 0, 0, 0, this.radius, this.radius);

        this.setupSymbols();
        this.setupBackground();

        this.tween = new TWEEN.Tween(this);
    }

    public spin(steps: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.tween
                .to({ rotation: ((Math.PI * 2) / 40) * steps }, steps * 50)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(() => {
                    resolve();
                })
                .start();
        });
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
        const step = (2 * Math.PI) / this.symbols.length;
        let angle = 0;

        const symbols = { Fries, Cake, Steak, Broccoli, Soda };

        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = new symbols[this.symbols[i]]();

            const x = this.radius + this.radius * Math.cos(angle) * -1;
            const y = this.radius + this.radius * Math.sin(angle) * -1;
            if (i == 0) {
                console.log(this.name, x, y);
            }

            symbol.position.set(x, y);
            symbol.anchor.set(0.5);
            symbol.rotation = angle;

            this.addChild(symbol);

            angle += step;
        }
    }
}

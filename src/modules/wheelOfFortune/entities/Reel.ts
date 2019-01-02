import Fries from "./Fries";
import Cake from "./Cake";
import Broccoli from "./Broccoli";
import Steak from "./Steak";
import Soda from "./Soda";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class Reel extends PIXI.Container {
    private spinningTween: TWEEN.Tween;

    constructor(
        public readonly name: string,
        private readonly radius: number,
        private readonly symbols: TFoodSymbol[]
    ) {
        super();
        this.setTransform(500, 500, 1, 1, 0, 0, 0, this.radius, this.radius);
        this.setupSymbols();
        this.spinningTween = new TWEEN.Tween(this);
    }

    public spin(steps: number): Promise<any> {
        return new Promise(resolve => {
            this.spinningTween
                .to({ rotation: this.mapStepsToRadians(steps) }, steps * 50)
                .easing(TWEEN.Easing.Quintic.Out)
                .onComplete(() => {
                    resolve();
                })
                .start();
        });
    }

    private mapStepsToRadians(steps: number): number {
        return ((Math.PI * 2) / this.symbols.length) * steps;
    }

    private setupSymbols(): void {
        const step = (2 * Math.PI) / this.symbols.length;
        let angle = 0;

        const symbols: FoodSymbolsList = { Fries, Cake, Steak, Broccoli, Soda };

        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = new symbols[this.symbols[i]]();

            const x = this.radius + this.radius * Math.cos(angle) * -1;
            const y = this.radius + this.radius * Math.sin(angle) * -1;

            symbol.position.set(x, y);
            symbol.anchor.set(0.5);
            symbol.rotation = angle;

            this.addChild(symbol);

            angle += step;
        }
    }
}

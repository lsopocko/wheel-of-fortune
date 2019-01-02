import { Store } from "vuex";
import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Fries from "../entities/Fries";
import Cake from "../entities/Cake";
import Broccoli from "../entities/Broccoli";
import Steak from "../entities/Steak";
import Soda from "../entities/Soda";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class ResultsScene extends Scene {
    public name: string = "ResultsScene";
    private resultsContainer: PIXI.Container;
    private fadeInTween: TWEEN.Tween;

    public constructor(store: Store<{}>) {
        super(store);
        this.alpha = 0;

        this.setTransform(0, 0, 1, 1, 0, 0, 0, 0, 0);

        const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = 1000;
        bg.height = 1000;
        bg.tint = 0x000000;
        bg.alpha = 0.9;

        this.addChild(bg);

        this.resultsContainer = new PIXI.Container();
        this.resultsContainer.setTransform(100, 200, 4, 4, 0, 0, 0, 0, 0);

        this.addChild(this.resultsContainer);

        this.fadeInTween = new TWEEN.Tween(this).to({ alpha: 1.0 }, 1000);
    }

    public initialize(): void {
        super.initialize();
        this.updateResult();
        this.fadeIn();
    }

    public update(delta: number): void {
        super.update(delta);
    }

    public reset(): void {
        super.reset();
        this.resultsContainer.removeChildren();
    }

    private updateResult(): void {
        const drawedSymbols = this.store.getters[
            "wheelOfFortuneStore/drawedSymbols"
        ];

        this.addResultsRow(drawedSymbols[0], 0);
        this.addResultsRow(drawedSymbols[1], 1);
        this.addResultsRow(drawedSymbols[2], 2);
    }

    private fadeIn(): void {
        this.fadeInTween.start();
    }

    private addResultsRow(symbolsInRow: TFoodSymbol[], row: number = 0): void {
        const symbols: FoodSymbolsList = { Fries, Cake, Steak, Broccoli, Soda };

        for (let i = 0; i < symbolsInRow.length; i++) {
            const symbol = new symbols[symbolsInRow[i]]() as FoodSymbol;

            const x = symbol.width * i + i * 10;
            const y = symbol.height * row + row * 10;

            symbol.position.set(x, y);

            this.resultsContainer.addChild(symbol);
        }
    }
}

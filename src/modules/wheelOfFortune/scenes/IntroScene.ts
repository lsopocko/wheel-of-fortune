import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Wheel from "../entities/Wheel";
import WheelFactory from "../WheelFactory";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class IntroScene extends Scene {
    private assets: (FoodSymbol | Wheel | PIXI.Container)[] = [];
    private tween: Tween;
    public name: string = "IntroScene";

    public constructor(store: any) {
        super(store);

        const wheelContainer = new PIXI.Container();

        wheelContainer.name = "wheelContainer";
        const wheelFactory = new WheelFactory();

        wheelContainer.addChild(
            wheelFactory.createWheel(300),
            wheelFactory.createWheel(340),
            wheelFactory.createWheel(380),
            wheelFactory.createWheel(420),
            wheelFactory.createWheel(460)
        );

        this.tween = new TWEEN.Tween(wheelContainer);

        this.tween
            .to({ rotation: 10.0 }, 6000)
            .easing(TWEEN.Easing.Exponential.Out);

        wheelContainer.setTransform(500, 500, 0.5, 0.5, 0, 0, 0, 500, 500);

        this.assets.push(wheelContainer);

        this.addChild(...this.assets);

        setTimeout(this.spin.bind(this), 5000);
    }

    public spin(): void {
        this.tween.start();
    }

    public update(delta: number): void {
        super.update(delta);
    }
}

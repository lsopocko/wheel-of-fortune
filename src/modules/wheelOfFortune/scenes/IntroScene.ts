import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Wheel from "../entities/Wheel";
import WheelFactory from "../WheelFactory";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class IntroScene extends Scene {
    private assets: (FoodSymbol | Wheel | PIXI.Container)[] = [];
    private tween: TWEEN.Tween;
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

        wheelContainer.setTransform(500, 500, 0.5, 0.5, 0, 0, 0, 500, 500);

        this.tween = new TWEEN.Tween(wheelContainer);

        this.tween
            .to({ rotation: 11.0 }, 4000)
            .easing(TWEEN.Easing.Quintic.InOut);

        this.tween.chain(
            new TWEEN.Tween({
                x: wheelContainer.scale.x,
                y: wheelContainer.scale.y,
                posX: wheelContainer.position.x,
                posY: wheelContainer.position.y
            })
                .to({ x: 3.0, y: 3.0, posX: 1600, posY: 500 }, 3000)
                .easing(TWEEN.Easing.Exponential.Out)
                .onUpdate(state => {
                    wheelContainer.scale = {
                        x: state.x,
                        y: state.y
                    } as PIXI.Point;

                    wheelContainer.position = {
                        x: state.posX,
                        y: state.posY
                    } as PIXI.Point;
                })
        );

        this.assets.push(wheelContainer);

        this.addChild(...this.assets);
    }

    public spin(): void {
        this.tween.stop();
        this.tween.start();
    }

    public stop(): void {
        this.tween.stop();
    }

    public update(delta: number): void {
        super.update(delta);
    }
}

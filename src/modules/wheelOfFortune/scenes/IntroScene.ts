import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Wheel from "../entities/Wheel";
import WheelFactory from "../WheelFactory";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

export default class IntroScene extends Scene {
    private assets: (FoodSymbol | Wheel | PIXI.Container)[] = [];
    private spinnedWheels: number = 0;
    public name: string = "IntroScene";

    public constructor(store: any) {
        super(store);

        const wheelContainer = new PIXI.Container();

        wheelContainer.name = "wheelContainer";
        const wheelFactory = new WheelFactory();

        wheelContainer.addChild(
            wheelFactory.createWheel(
                300,
                "wheel1",
                this.store.state.WheelOfFortuneStore.reels[0]
            ),
            wheelFactory.createWheel(
                340,
                "wheel2",
                this.store.state.WheelOfFortuneStore.reels[1]
            ),
            wheelFactory.createWheel(
                380,
                "wheel3",
                this.store.state.WheelOfFortuneStore.reels[2]
            ),
            wheelFactory.createWheel(
                420,
                "wheel4",
                this.store.state.WheelOfFortuneStore.reels[3]
            ),
            wheelFactory.createWheel(
                460,
                "wheel5",
                this.store.state.WheelOfFortuneStore.reels[4]
            )
        );

        wheelContainer.setTransform(500, 500, 1, 1, 0, 0, 0, 500, 500);

        this.assets.push(wheelContainer);

        this.addChild(...this.assets);
    }

    public initialize(): void {
        super.initialize();
        this.spin(this.store.state.WheelOfFortuneStore.results);
    }

    public reset(): void {
        super.reset();
        const wheelContainer = this.getChildByName("wheelContainer");
        this.spinnedWheels = 0;
        wheelContainer.scale.set(1, 1);
        wheelContainer.position.set(500, 500);
    }

    /**
     * @param  {number} steps - one step is one symbol
     */
    public spin(steps: number[]): void {
        const wheelContainer = this.getChildByName("wheelContainer");
        (wheelContainer.getChildByName("wheel1") as Wheel)
            .spin(steps[0])
            .then(() => {
                this.spinnedWheels++;
                this.checkIfFinishedSpinning();
            });

        (wheelContainer.getChildByName("wheel2") as Wheel)
            .spin(steps[1])
            .then(() => {
                this.spinnedWheels++;
                this.checkIfFinishedSpinning();
            });

        (wheelContainer.getChildByName("wheel3") as Wheel)
            .spin(steps[2])
            .then(() => {
                this.spinnedWheels++;
                this.checkIfFinishedSpinning();
            });

        (wheelContainer.getChildByName("wheel4") as Wheel)
            .spin(steps[3])
            .then(() => {
                this.spinnedWheels++;
                this.checkIfFinishedSpinning();
            });

        (wheelContainer.getChildByName("wheel5") as Wheel)
            .spin(steps[4])
            .then(() => {
                this.spinnedWheels++;
                this.checkIfFinishedSpinning();
            });
    }

    public update(delta: number): void {
        super.update(delta);
    }

    private checkIfFinishedSpinning() {
        if (this.spinnedWheels == 5) {
            this.zoomInResult();
        }
    }

    private zoomInResult() {
        const wheelContainer = this.getChildByName("wheelContainer");
        const zoomInTween = new TWEEN.Tween({
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
            .onComplete(() => {
                this.store.dispatch("WheelOfFortuneStore/showResults");
            })
            .start();
    }
}

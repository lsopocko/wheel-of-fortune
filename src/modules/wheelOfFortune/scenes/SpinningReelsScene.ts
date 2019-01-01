import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Reel from "../entities/Reel";
import ReelFactory from "../ReelFactory";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import config from "../config";

export default class SpinningReelsScene extends Scene {
    private assets: (FoodSymbol | Reel | PIXI.Container)[] = [];
    private spinnedWheels: number = 0;
    private reels: Reel[] = [];
    public name: string = "SpinningReelsScene";

    public constructor(store: any) {
        super(store);

        const reelsContainer = new PIXI.Container();

        reelsContainer.name = "reelsContainer";

        reelsContainer.setTransform(500, 500, 1, 1, 0, 0, 0, 500, 500);

        this.assets.push(reelsContainer);

        this.addChild(...this.assets);

        this.setupReels();
    }

    public initialize(): void {
        super.initialize();
        this.spin(this.store.state.WheelOfFortuneStore.results);
    }

    public reset(): void {
        super.reset();
        const reelsContainer = this.getChildByName("reelsContainer");
        this.spinnedWheels = 0;
        reelsContainer.scale.set(1, 1);
        reelsContainer.position.set(500, 500);
    }

    /**
     * @param  {number} steps - one step equals rotation by one symbol
     */
    public spin(steps: number[]): void {
        let stepIndex = 0;

        for (const reel of this.reels) {
            const step = steps[stepIndex];
            if (typeof step !== "undefined") {
                reel.spin(step).then(() => {
                    this.spinnedWheels++;
                    this.checkIfFinishedSpinning();
                });
            }

            stepIndex++;
        }
    }

    public update(delta: number): void {
        super.update(delta);
    }

    private setupReels(): void {
        const reelsContainer = this.getChildByName("reelsContainer");
        let radius = 300;

        for (let reelIndex = 0; reelIndex < config.reels; reelIndex++) {
            this.reels.push(
                ReelFactory.createReel(
                    `wheel${reelIndex + 1}`,
                    radius,
                    this.store.state.WheelOfFortuneStore.reels[reelIndex]
                )
            );

            radius += 40;
        }

        reelsContainer.addChild(...this.reels);
    }

    private checkIfFinishedSpinning() {
        if (this.spinnedWheels == this.reels.length) {
            this.zoomIn();
        }
    }

    private zoomIn() {
        const reelsContainer = this.getChildByName("reelsContainer");
        const zoomInTween = new TWEEN.Tween({
            x: reelsContainer.scale.x,
            y: reelsContainer.scale.y,
            posX: reelsContainer.position.x,
            posY: reelsContainer.position.y
        })
            .to({ x: 3.0, y: 3.0, posX: 1600, posY: 500 }, 3000)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(state => {
                reelsContainer.scale = {
                    x: state.x,
                    y: state.y
                } as PIXI.Point;

                reelsContainer.position = {
                    x: state.posX,
                    y: state.posY
                } as PIXI.Point;
            })
            .onComplete(() => {
                // @TODO shouldnt call store, scene should trigger its own event when its done
                this.store.dispatch("WheelOfFortuneStore/showResults");
            })
            .start();
    }
}

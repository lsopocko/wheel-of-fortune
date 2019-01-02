import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Reel from "../entities/Reel";
import ReelFactory from "../ReelFactory";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import config from "../config";

export default class SpinningReelsScene extends Scene {
    public name: string = "SpinningReelsScene";
    private assets: (FoodSymbol | Reel | PIXI.Container)[] = [];
    private spinnedWheels: number = 0;
    private reels: Reel[] = [];

    public constructor(store: any) {
        super(store);

        const reelsContainer = new PIXI.Container();

        reelsContainer.name = "reelsContainer";

        reelsContainer.setTransform(500, 500, 1, 1, 0, 0, 0, 500, 500);

        this.assets.push(reelsContainer);

        // @todo it deserves separate entity
        const marker = PIXI.Sprite.from("assets/marker.png");

        marker.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        // @todo it shouldn't require scaling or magic number in possition
        marker.setTransform(3, 380, 0.78, 0.78, 0, 0, 0, 0, 0);

        this.addChild(...this.assets);

        this.setupReels();
        reelsContainer.addChild(marker);
    }

    public initialize(): void {
        super.initialize();
        this.spin(this.store.state.wheelOfFortuneStore.results);
    }

    public reset(): void {
        super.reset();
        const reelsContainer = this.getChildByName("reelsContainer");
        this.spinnedWheels = 0;
        reelsContainer.scale.set(1, 1);
        reelsContainer.position.set(500, 500);
    }

    public update(delta: number): void {
        super.update(delta);
    }

    /**
     * @param  {number} steps - one step equals rotation by one symbol
     */
    private spin(steps: number[]): void {
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

    private setupReels(): void {
        const reelsContainer = this.getChildByName("reelsContainer");
        let radius = 300;

        for (let reelIndex = 0; reelIndex < config.reels; reelIndex++) {
            this.reels.push(
                ReelFactory.createReel(
                    `wheel${reelIndex + 1}`,
                    radius,
                    this.store.state.wheelOfFortuneStore.reels[reelIndex]
                )
            );

            radius += 40;
        }

        reelsContainer.addChild(...this.reels);
    }

    private checkIfFinishedSpinning(): void {
        if (this.spinnedWheels == this.reels.length) {
            this.zoomIn();
        }
    }

    private zoomIn(): void {
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
                this.store.dispatch("wheelOfFortuneStore/showResults");
            })
            .start();
    }
}

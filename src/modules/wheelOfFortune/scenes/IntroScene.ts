import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Wheel from "../entities/Wheel";
import WheelFactory from "../WheelFactory";

export default class IntroScene extends Scene {
    private assets: (FoodSymbol | Wheel | PIXI.Container)[] = [];

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

        this.assets.push(wheelContainer);

        this.addChild(...this.assets);
    }

    public update(delta: number): void {
        super.update(delta);
        if (this.store.state.WheelOfFortuneStore.isSpinning) {
            this.getChildByName("wheelContainer").rotation -= 0.005 * delta;
        }
    }
}

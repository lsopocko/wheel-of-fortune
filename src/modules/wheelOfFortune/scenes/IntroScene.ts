import Scene from "./Scene";
import FoodSymbol from "../entities/FoodSymbol";
import Wheel from "../entities/Wheel";

export default class IntroScene extends Scene {
    private assets: (FoodSymbol | Wheel | PIXI.Container)[] = [];

    public name: string = "IntroScene";

    public constructor() {
        super();

        const wheelContainer = new PIXI.Container();

        wheelContainer.name = "wheelContainer";

        wheelContainer.addChild(
            new Wheel(300),
            new Wheel(340),
            new Wheel(380),
            new Wheel(420),
            new Wheel(460)
        );

        wheelContainer.setTransform(500, 500, 0.5, 0.5, 0, 0, 0, 500, 500);

        this.assets.push(wheelContainer);

        this.addChild(...this.assets);
    }

    public update(delta: number): void {
        super.update(delta);
        this.getChildByName("wheelContainer").rotation -= 0.005 * delta;
    }
}

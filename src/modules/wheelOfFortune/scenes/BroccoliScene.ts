import Scene from "./Scene";
import Broccoli from "../entities/Broccoli";

export default class BroccoliScene extends Scene {
    public name: string = "BroccoliScene";

    public constructor() {
        super();
        const broccoli = new Broccoli();

        broccoli.x += broccoli.width;

        broccoli.y += broccoli.height * 2 + 10;

        broccoli.anchor.set(0.5);

        this.addChild(broccoli);
    }

    public update(delta: number): void {
        super.update(delta);

        this.getChildByName("broccoli").rotation += 0.1 * delta;
    }
}

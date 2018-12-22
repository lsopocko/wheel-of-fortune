import Scene from "./Scene";
import Fries from "../entities/Fries";
import Cake from "../entities/Cake";
import Soda from "../entities/Soda";
import Broccoli from "../entities/Broccoli";
import Steak from "../entities/Steak";
import FoodSymbol from "../entities/FoodSymbol";

export default class IntroScene extends Scene {
    private assets: FoodSymbol[] = [];

    public name: string = "IntroScene";

    public constructor() {
        super();

        const fries = new Fries();
        const cake = new Cake();
        const soda = new Soda();
        const broccoli = new Broccoli();
        const steak = new Steak();

        fries.x += fries.width;
        fries.y += fries.height;

        cake.x += cake.width + fries.x + 10;
        cake.y += cake.height;

        soda.x += soda.width + cake.x + 10;
        soda.y += soda.height;

        broccoli.x += broccoli.width + soda.x + 10;

        broccoli.y += broccoli.height;

        steak.x += steak.width + broccoli.x + 10;
        steak.y += steak.height;

        this.assets.push(fries, cake, soda, broccoli, steak);

        this.addChild(...this.assets);
    }

    public update(delta: number): void {
        super.update(delta);
    }
}

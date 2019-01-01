import FoodSymbol from "./FoodSymbol";

export default class Cake extends FoodSymbol {
    private static TEXTURE = PIXI.Texture.fromImage("assets/symbols/cake.png");

    public readonly name: string = "cake";

    constructor() {
        super(Cake.TEXTURE);
    }
}

import FoodSymbol from "./FoodSymbol";

export default class Fries extends FoodSymbol {
    private static TEXTURE = PIXI.Texture.from("assets/symbols/fries.png");

    public readonly name: string = "fries";

    constructor() {
        super(Fries.TEXTURE);
    }
}

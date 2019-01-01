import FoodSymbol from "./FoodSymbol";

export default class Broccoli extends FoodSymbol {
    private static TEXTURE = PIXI.Texture.fromImage(
        "assets/symbols/broccoli.png"
    );

    public readonly name: string = "broccoli";

    constructor() {
        super(Broccoli.TEXTURE);
    }
}

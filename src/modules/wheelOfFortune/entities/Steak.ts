import FoodSymbol from "./FoodSymbol";

export default class Steak extends FoodSymbol {
    private static TEXTURE = PIXI.Texture.fromImage(
        "./assets/symbols/steak.png"
    );

    public readonly name: string = "steak";

    constructor() {
        super(Steak.TEXTURE);
    }
}

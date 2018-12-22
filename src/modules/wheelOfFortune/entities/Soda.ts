import FoodSymbol from "./FoodSymbol";

export default class Soda extends FoodSymbol {
    private static TEXTURE = PIXI.Texture.fromImage(
        "./assets/symbols/soda.png"
    );

    public readonly name: string = "soda";

    constructor() {
        super(Soda.TEXTURE);
    }
}

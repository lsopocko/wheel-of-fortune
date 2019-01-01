import Reel from "./entities/Reel";

class ReelFactory {
    static createReel(
        name: string,
        radius: number,
        symbols: TFoodSymbol[]
    ): Reel {
        return new Reel(name, radius, symbols);
    }
}

export default ReelFactory;

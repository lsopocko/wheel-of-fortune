import Wheel from "./entities/Wheel";

export default class WheelFactory {
    public constructor() {}

    public createWheel(radius: number, name: string, symbols: string[]): Wheel {
        return new Wheel(radius, name, symbols);
    }
}

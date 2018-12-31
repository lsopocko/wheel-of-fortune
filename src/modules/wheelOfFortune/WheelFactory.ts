import Wheel from "./entities/Wheel";

export default class WheelFactory {
    public constructor() {}

    public createWheel(radius: number): Wheel {
        return new Wheel(radius);
    }
}

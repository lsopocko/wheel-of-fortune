import { Store } from "vuex";
import * as PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
    constructor(protected store: any) {
        super();
    }

    public initialize(): void {}

    public reset(): void {}

    public update(delta: number): void {}
}

import * as PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
    constructor(protected store: any) {
        super();
    }

    public update(delta: number): void {}
}

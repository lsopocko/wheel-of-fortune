import * as PIXI from "pixi.js";

export default class Bunny extends PIXI.Sprite {
    private static TEXTURE = PIXI.Texture.fromImage("./logo.png");

    public constructor() {
        super(Bunny.TEXTURE);

        this.anchor.set(0.5);
    }
}

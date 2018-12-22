import * as PIXI from "pixi.js";

export default class FoodSymbol extends PIXI.Sprite {
    public constructor(texture: PIXI.Texture) {
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        super(texture);
        this.anchor.set(0.5);
        this.width = 64;
        this.height = 64;
    }
}

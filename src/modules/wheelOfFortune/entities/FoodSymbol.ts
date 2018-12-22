import * as PIXI from "pixi.js";

export default class FoodSymbol extends PIXI.Sprite {
    public constructor(texture: PIXI.Texture) {
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        super(texture);
        this.width = 32;
        this.height = 32;
    }
}

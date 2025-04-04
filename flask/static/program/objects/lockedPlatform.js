import { GameObject } from "../../library.js";
import { drawRect } from "../../shape.js";

export class LockedPlatform extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);

        this.w = w;
        this.h = h;
        this.objectType = "platform";
    }

    update(dt) {
        this.draw();
    }

    draw() {
        if(this.colliders.length === 0) {
            drawRect(this.xPos, this.yPos, this.w, this.h, 6);
        } else {
            drawRect(this.xPos, this.yPos, this.w, this.h, 10);
        }
    }
}
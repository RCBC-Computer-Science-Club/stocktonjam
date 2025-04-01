import {Collider, GameObject} from "../../library.js";
import {drawRect} from "../../shape.js";

export class Platform extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);

        this.w = w;
        this.h = h;
        this.objectType = "platform";

        let collider = new Collider();
        collider.h = this.h;
        collider.w = this.w;
        this.colliders.push(collider);
    }

    update(dt) {
        this.draw()
    }

    draw() {
        drawRect(this.xPos, this.yPos, this.w, this.h, 10);
    }

}
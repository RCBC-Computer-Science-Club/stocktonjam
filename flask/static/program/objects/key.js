import { Collider, GameObject } from "../../library.js";
import { drawRect } from "../../shape.js";

export class Key extends GameObject {
    constructor(x, y, unlocks) {
        super(x, y);

        this.w = 5;
        this.h = 5;
        this.objectType = "key";
        this.isLocked = true;
        this.unlocks = unlocks;

        this.baseY = this.yPos;
        this.time = 0;
        this.amplitude = 2;
        this.freq = 0.0125;

        let collider = new Collider();
        collider.h = this.h;
        collider.w = this.w;
        this.colliders.push(collider);
    }

    update(dt) {
        this.time += dt;
        if (this.baseY === undefined) this.baseY = this.yPos;
        let yOffset = this.amplitude * Math.sin(this.freq * this.time);
        this.yPos = this.baseY + yOffset;
        if(this.isLocked) this.draw();
    }

    draw() {
        drawRect(Math.round(this.xPos), Math.round(this.yPos), this.w, this.h, 13);
    }

    onCollide(objectType, params = {}) {
        if(params.collidedWith.objectType === "player") {
            if(this.unlocks.colliders.length === 0) {
                const collider = new Collider();
                collider.h = this.unlocks.h;
                collider.w = this.unlocks.w;
                this.unlocks.colliders.push(collider);

                this.isLocked = false;
                this.colliders = [];
            }
        }
    }

}
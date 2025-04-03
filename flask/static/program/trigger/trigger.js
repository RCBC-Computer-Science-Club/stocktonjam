import { GameObject, Collider, collisionObjects } from "../../library.js";

export class Trigger extends GameObject {
    constructor(x,y,w,h) {
        super(x,y);

        this.w = w;
        this.h = h;
        this.objectType = "trigger";

        const triggerCollider = new Collider();
        triggerCollider.w = w;
        triggerCollider.h = h;
        this.colliders = [
            triggerCollider,
        ];
    }
}

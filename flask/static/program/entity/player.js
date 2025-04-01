import {Collider, GameObject} from "../../library.js";
import {Inputs, p_y} from "../../platform.js";
import { drawRect } from "../../shape.js";

export class Player extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);

        this.w = w;
        this.h = h;
        this.dx = 0;
        this.dy = 0;
        this.speed = 0.3;
        this.gravity = 0.005;
        this.jumpStrength = -0.75;
        this.isGrounded = false;
        this.objectType = "player";

        let collider = new Collider();
        collider.h = this.h;
        collider.w = this.w;
        this.colliders.push(collider);
    }

    update(dt) {
        this.dx = 0;
        if (Inputs.includes("p1-left")) this.dx -= 0.5;
        if (Inputs.includes("p1-right")) this.dx += 0.5;
        this.dx *= this.speed;

        if (this.isGrounded && Inputs.includes("p1-up")) {
            this.dy = this.jumpStrength;
            this.isGrounded = false;
        }

        if (!this.isGrounded) {
            this.dy += this.gravity * dt;
            this.dy = Math.min(this.dy, 15);
        }

        this.xPos += this.dx * dt;
        this.yPos += this.dy * dt;

        // Temp
        const groundLevel = 200;
        if (this.yPos >= groundLevel) {
            this.yPos = groundLevel;
            this.dy = 0;
            this.isGrounded = true;
        }

        this.draw();
    }

    draw() {
        drawRect(Math.round(this.xPos), Math.round(this.yPos), this.w, this.h, 15);
    }
}

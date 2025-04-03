import {Collider, GameObject, collisionObjects, castRay} from "../../library.js";
import {getInputs} from "../../platform.js";
import { drawRect } from "../../shape.js";
import { activeSequence } from "../main.js";
export class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y);

        this.w = w;
        this.h = h;
        this.dy = 0;
        this.dx = 0;
        this.gravity = 0.005;
        this.speed = 0.3;
        this.jumpStrength = -0.75;
        this.isGrounded = false;
        this.isJumping = false;
        this.objectType = "player";

        let leftCollider = new Collider(collisionObjects.SIDE_LEFT);
        leftCollider.h = this.h;
        leftCollider.w = this.w / 2;
        let rightCollider = new Collider(collisionObjects.SIDE_RIGHT);
        rightCollider.h = this.h;
        rightCollider.w = this.w / 2;
        rightCollider.offsetX = this.w / 2;
        let topCollider = new Collider(collisionObjects.SIDE_TOP);
        topCollider.h = this.h / 2;
        topCollider.w = this.w;
        let bottomCollider = new Collider(collisionObjects.SIDE_BOTTOM);
        bottomCollider.h = this.h / 2;
        bottomCollider.w = this.w;
        bottomCollider.offsetY = this.h / 2;

        this.colliders.push(topCollider);
        this.colliders.push(bottomCollider);
        this.colliders.push(leftCollider);
        this.colliders.push(rightCollider);
    }

    update(dt) {
        this.checkGroundBelow();

        const Inputs = getInputs();

        this.dx = 0;
        if (Inputs.includes("p1-left")) this.dx -= 0.5;
        if (Inputs.includes("p1-right")) this.dx += 0.5;
        this.dx *= this.speed;

        if (this.isGrounded && !this.isJumping && Inputs.includes("p1-up")) {
            this.dy = this.jumpStrength;
            this.isGrounded = false;
            this.isJumping = true;
        }

        if (!this.isGrounded) {
            this.dy += this.gravity * dt;
            this.dy = Math.min(this.dy, 0.1);
        }

        this.xPos += this.dx * dt;
        this.yPos += this.dy * dt;
        this.draw();
    }

    draw() {
        drawRect(Math.round(this.xPos), Math.round(this.yPos), this.w, this.h, 15);
    }

    onCollide(colliderType, params) {
        if(params.collidedWith.objectType === "platform") {
            if (colliderType === collisionObjects.SIDE_BOTTOM) { // The bottom of the player object
                this.dy = Math.min(this.dy, 0);
                this.isJumping = false;
                this.isGrounded = true;
            } else if (colliderType === collisionObjects.SIDE_LEFT) { // The left side of the player object
                if(this.dx < 0) {
                    this.dx = 0;
                }
            } else if (colliderType === collisionObjects.SIDE_RIGHT) { // The right side of the player object
                if(this.dx > 0) {
                    this.dx = 0;
                }
            } else if (colliderType === collisionObjects.SIDE_TOP) { // The top of the player object
                this.dy = Math.max(this.dy, 0);
            }
        }
    }

    checkGroundBelow() {
        const rayOrigin = { x: this.xPos + this.w / 2, y: this.yPos + this.h };
        const rayDirection = { x: 0, y: 1 };
        const maxDistance = 5;
        const hit = castRay(rayOrigin, rayDirection, maxDistance, this, activeSequence.sequences[0].objectManager.objects);
        this.isGrounded = hit.hit;
        if (!this.isGrounded) {
            this.isJumping = true;
        }
    }
}
import { Trigger } from "./trigger.js";
import { activeSequence } from "../main.js";
import { drawRect } from "../../shape.js";

export class SequenceTrigger extends Trigger {
    constructor(x, y, w, h, sequence, onStart, show = false) {
        super(x, y, w, h);
        this.sequence = sequence;
        this.show = show;
        this.onStart = onStart;
    }

    update(dt) {
        if(this.show) this.draw();
    }

    draw() {
        if(this.show) drawRect(this.xPos, this.yPos, this.w, this.h, 5);
    }

    onCollide(colliderId, params) {
        if(params.collidedWith.objectType === "player") {
            if(this.sequence === null) return;
            activeSequence.pop();
            activeSequence.push(this.sequence);

            this.onStart();
        }
    }
}

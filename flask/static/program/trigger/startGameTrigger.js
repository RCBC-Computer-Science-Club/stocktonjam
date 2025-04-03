import { Trigger } from "./trigger.js";
import { activeSequence } from "../main.js";
import { level1Sequence } from "../main.js";

export class StartGameTrigger extends Trigger {
    constructor(x,y, w, h) {
        super(x,y, w, h);
    }

    onCollide(colliderId, params) {
        if(params.collidedWith.objectType === "player") {
            activeSequence.pop();
            activeSequence.push(level1Sequence);
        }
    }
}

import { drawRect } from "../shape.js";
import { p_y, setFrameRateLimit } from "../platform.js";
import { SequenceDispatcher, Sequence } from "../sequence.js";
import { Player } from "./entity/player.js";
import { Platform } from "./objects/platform.js";

console.log("Program Main Start");
console.log("Stockton SP2025 Game Jam RCBC entrant!");

//dev note:
    //sequences_main should be for managing sequences as they should occur in the finished game
    //sequences_beta is for developer convenience, make as much of a mess there as you'd like, it's for testing things
    //just change the one the code actaully runs as needed

let sequences_main = new SequenceDispatcher();
let sequences_beta = new SequenceDispatcher();

let activeSequence = sequences_beta;
let debugColliders = true;

function drawColliders(){
    let objIndex = 0;
    for (let object of activeSequence.sequences[0].objectManager.objects) {
        for (let collider of activeSequence.sequences[0].objectManager.objects[objIndex].colliders) {
            drawRect(object.xPos + collider.offsetX, object.yPos + collider.offsetY, collider.w, collider.h, 3);
        }
        objIndex++;
    }
}

export function programStart() {
    setFrameRateLimit(60);

    const sequence = new Sequence("Test Sequence");

    let player = new Player(20, 20, 10, 20);
    let platforms = [];
    platforms.push(new Platform(20, 100, 100, 10));
    platforms.push(new Platform(150, 120, 50, 10));

    sequence.objectManager.push(player);
    sequence.objectManager.push(platforms[0]);
    sequence.objectManager.push(platforms[1]);

    sequences_main.push(new Sequence("title screen"));
    sequences_beta.push(sequence);
}

export function programUpdate(deltaT) {
    drawRect(0, 220, p_y, p_y - 220, 5);
    activeSequence.update(deltaT);

    if (debugColliders){
        drawColliders();
    }
}

export function programEnd() {

}

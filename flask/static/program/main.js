import { drawRect } from "../shape.js";
import { p_x, p_y, setFrameRateLimit } from "../platform.js";
import { SequenceDispatcher, Sequence } from "../sequence.js";
import { Player } from "./entity/player.js";
import { Platform } from "./objects/platform.js";
import { drawText } from "../text.js";
import { StartGameTrigger } from "./trigger/startGameTrigger.js";

console.log("Program Main Start");
console.log("Stockton SP2025 Game Jam RCBC entrant!");

//dev note:
    //sequences_main should be for managing sequences as they should occur in the finished game
    //sequences_beta is for developer convenience, make as much of a mess there as you'd like, it's for testing things
    //just change the one the code actaully runs as needed

let sequences_main = new SequenceDispatcher();

export const titleSequence = new Sequence("title screen");
export const level1Sequence = new Sequence("level1");

export let activeSequence = sequences_main;
let player;

export function programStart() {
    setFrameRateLimit(0);

    player = new Player((p_y / 2) - 10, 200, 10, 20);

    titleSequence.objectManager.push(new Platform(0, 220, p_y, p_y - 220));
    titleSequence.objectManager.push(new StartGameTrigger(0, 0, p_y, 150));
    titleSequence.objectManager.push(player);


    level1Sequence.objectManager.push(new Platform(0, 220, p_y, p_y - 220));
    level1Sequence.objectManager.push(player);
    sequences_main.push(titleSequence);
}

export function programUpdate(deltaT) {
    if(activeSequence.sequences[0].label === "title screen") {
        titleScreen();
    }
    if(activeSequence.sequences[0].label === "level1") {
        level1();
    }
    activeSequence.update(deltaT);
}

export function programEnd() {

}

function titleScreen() { 
    drawText("Unnamed Game", 50, 50, 0, 0, 15, 18);
    drawText("Press Up to Start", 65, 80, 0, 0, 12, 12);
}

function level1() {
    drawText("Level 1", 50, 50, 0, 0, 15, 18);
}

let debugColliders = false;

function drawColliders(){
    let objIndex = 0;
    for (let object of activeSequence.sequences[0].objectManager.objects) {
        for (let collider of activeSequence.sequences[0].objectManager.objects[objIndex].colliders) {
            drawRect(object.xPos + collider.offsetX, object.yPos + collider.offsetY, collider.w, collider.h, 3);
        }
        objIndex++;
    }
}


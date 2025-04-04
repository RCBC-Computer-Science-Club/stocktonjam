import { drawRect } from "../shape.js";
import { p_x, p_y, setFrameRateLimit } from "../platform.js";
import { SequenceDispatcher, Sequence } from "../sequence.js";
import { Player } from "./entity/player.js";
import { Platform } from "./objects/platform.js";
import { drawText } from "../text.js";
import {SequenceTrigger} from "./trigger/sequenceTrigger.js";
import {Key} from "./objects/key.js";
import {LockedPlatform} from "./objects/lockedPlatform.js";

console.log("Program Main Start");
console.log("Stockton SP2025 Game Jam RCBC entrant!");

//dev note:
    //sequences_main should be for managing sequences as they should occur in the finished game
    //sequences_beta is for developer convenience, make as much of a mess there as you'd like, it's for testing things
    //just change the one the code actaully runs as needed

let sequences_main = new SequenceDispatcher();

export const titleSequence = new Sequence("title screen");
export const scene1Sequence1 = new Sequence("scene1seq1");
export const scene1Sequence2 = new Sequence("scene1seq2");

export let activeSequence = sequences_main;
let player;

export function programStart() {
    setFrameRateLimit(60);

    player = new Player((p_y / 2) - 10, 200, 10, 20);

    titleSequence.objectManager.push(new Platform(0, 220, p_y, p_y - 220));
    titleSequence.objectManager.push(new SequenceTrigger(0, 0, p_y, 200, scene1Sequence1, () => {}));
    titleSequence.objectManager.push(player);

    scene1Sequence1.objectManager.push(new Platform(0, 220, p_y, p_y - 220));
    scene1Sequence1.objectManager.push(new Platform(10, 175, 100, 10));
    scene1Sequence1.objectManager.push(new Platform(135, 135, 100, 10));
    scene1Sequence1.objectManager.push(new Platform(10, 100, 100, 10));
    scene1Sequence1.objectManager.push(new Platform(135, 60, 100, 10));
    scene1Sequence1.objectManager.push(new SequenceTrigger(205, 30, 15, 30,  scene1Sequence2,() =>  scene1Sequence2Start(), true));
    scene1Sequence1.objectManager.push(player);

    scene1Sequence2.objectManager.push(new Platform(0, 220, p_y, p_y - 220));
    scene1Sequence2.objectManager.push(new Platform(10, 175, 100, 10));
    scene1Sequence2.objectManager.push(new Platform(135, 135, 100, 10));
    scene1Sequence2.objectManager.push(new Platform(10, 100, 100, 10));
    let lockedPlatform = new LockedPlatform(135, 60, 100, 10)
    scene1Sequence2.objectManager.push(lockedPlatform);
    scene1Sequence2.objectManager.push(new Key(15, 155, lockedPlatform));
    scene1Sequence2.objectManager.push(new SequenceTrigger(205, 30, 15, 30,  null, () => {}, true));
    scene1Sequence2.objectManager.push(player);

    sequences_main.push(titleSequence);
}

export function programUpdate(deltaT) {
    if(activeSequence.sequences[0].label === "title screen") {
        titleScreenUpdate();
    }
    if(activeSequence.sequences[0].label === "scene1seq1") {
        scene1Sequence1Update();
    }
    if(activeSequence.sequences[0].label === "scene1seq2") {
        scene1Sequence2Update();
    }
    activeSequence.update(deltaT);
}

export function programEnd() {

}

function titleScreenUpdate() {
    drawText("Unnamed Game", 50, 50, 0, 0, 15, 18);
    drawText("Press Up to Start", 65, 80, 0, 0, 12, 12);
}

function scene1Sequence1Update() {
    drawText("Scene 1", 5, 5, 0, 0, 12, 12);
    drawText('"Such comfort as from a winter home', 5, 15, 200, 0, 15, 12);
}

function scene1Sequence2Start() {
    player.xPos = (p_y / 2) - 10;
    player.yPos = 200;
}

function scene1Sequence2Update() {
    drawText("Scene 2", 5, 5, 0, 0, 12, 12);
    drawText('Joy, glee, giddiness, it was incomplete', 5, 15, 200, 0, 15, 12);
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


console.log("Program Main Start");
console.log("Stockton SP2025 Game Jam RCBC entrant!");

//dev note:
    //sequences_main should be for managing sequences as they should occur in the finished game
    //sequences_beta is for developer convenience, make as much of a mess there as you'd like, it's for testing things
    //just change the one the code actaully runs as needed
let sequences_main = new SequenceDispatcher();
let sequences_beta = new SequenceDispatcher();

let rootSequence = sequences_beta;

let debugColliders = true;

function drawColliders(){
    for (let i = 0; i < rootSequence.sequences.at(-1).gameObjects.objects.length; i++){
        for (let j = 0; j < rootSequence.sequences.gameObjects.objects[i].colliders.length; j++){
            thisObject = rootSequence.sequences.gameObjects.objects[i];
            drawRect(thisObject.xPos + thisObject.colliders[j].offsetX, thisObject.yPos + thisObject.colliders[j].offsetY, thisObject.colliders[j].w, thisObject.colliders[j].h, 15);
        }
    }
}

function programStart() {
    p_setFrameRateLimit(0);

    sequences_main.push(new Sequence("title screen"));
    sequences_beta.push(new Sequence("test level")); 
}

function programUpdate(deltaT) {
    viewbuffer = Array(p_x * p_y); //clear the view buffer
    rootSequence.update(deltaT); 
   
    if (debugColliders){
        drawColliders();
    }
}

function programEnd() {

}

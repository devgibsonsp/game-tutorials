const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

const PLAYER_SPEED = 4;

function warriorClass() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myWarriorPic;

    this.keyHeld_Up = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
    this.name = "Untitled Warrior";


    this.keys = 0;

    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    this.reset = function(whichImage, warriorName) {
        this.name = warriorName;
        this.myWarriorPic = whichImage;
        this.speed = 0;
        this.keys = 0;
        for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
                if(worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    //this.ang = -Math.PI/2
                    this.x = eachCol * WORLD_W + WORLD_W/2;
                    this.y = eachRow * WORLD_H + WORLD_H/2;
                    return;
                }
            }
        }
        console.log("NO PLAYER START FOUND");
    } // END warriorReset

    this.move = function() {
    

        var nextX = this.x;
        var nextY = this.y;


        if(this.keyHeld_Up) {
            nextY -= PLAYER_SPEED;
        }
        if(this.keyHeld_Reverse) {
            nextY += PLAYER_SPEED;
        }
        if(this.keyHeld_TurnLeft) {
            nextX -= PLAYER_SPEED;
        }
        if(this.keyHeld_TurnRight) {
            nextX += PLAYER_SPEED;
        }

        var tile = returnTileTypeAtColRow(Math.floor(nextX/WORLD_W),Math.floor(nextY/WORLD_H));
        
        if(tile == WORLD_ROAD) {
            this.x = nextX;
            this.y = nextY;
        }
        if(tile == WORLD_TREE) {
            this.keys += 1;
            console.log(worldGrid[Math.floor(nextX/WORLD_W) + WORLD_COLS * Math.floor(nextY/WORLD_H)]);
            worldGrid[Math.floor(nextX/WORLD_W) + WORLD_COLS * Math.floor(nextY/WORLD_H)] = WORLD_ROAD;
            console.log(this.keys);
        }
        if(tile == WORLD_FLAG && this.keys > 0) {
            worldGrid[Math.floor(nextX/WORLD_W) + WORLD_COLS * Math.floor(nextY/WORLD_H)] = WORLD_ROAD;
            this.keys -= 1;
        }
        if(tile == WORLD_GOAL) {
            loadLevel(levelOne);
        }
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, this.ang);
    }
}
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var levelOne =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
                 1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
                 1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
                 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
                 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
                 1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
                 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var worldGrid = [];
const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    //console.log(col);
    if(col >= 0 && col < WORLD_COLS &&
        row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return (worldGrid[worldIndexUnderCoord]);
    } else {
        return WORLD_WALL;
    }
}

function warriorWorldHandling(whichWarrior) {
    var warriorWorldCol = Math.floor(whichWarrior.x / WORLD_W);
    var warriorWorldRow = Math.floor(whichWarrior.y / WORLD_H);
    var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

    if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
        warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {

        var tileHere = returnTileTypeAtColRow(warriorWorldCol,warriorWorldRow);

        if(tileHere != WORLD_ROAD) {
            whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
            whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;

            whichWarrior.speed *= -0.5; 

        } // end of world found
    } // end of valid col and row
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(tile) {
    if(tile < WORLD_PLAYERSTART) {
        return true;
    }
    return false;
}

function drawWorlds() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
            var tileKindHere = worldGrid[arrayIndex];
            //console.log(tileTypeHasTransparency(tileKindHere));
            var useImg = worldPics[tileKindHere];
            if(!tileTypeHasTransparency(tileKindHere)) {
                //console.log("test");
                canvasContext.drawImage(worldPics[0], drawTileX, drawTileY) 
                
            }
                
            canvasContext.drawImage(useImg, drawTileX, drawTileY)
            //canvasContext.drawImage(useImg, drawTileX, drawTileY)
            drawTileX += WORLD_W;
            arrayIndex += 1;
        } // end of for each world
        drawTileY += WORLD_H;
        drawTileX = 0;
    } // end of for each row

} // end of drawWorlds func
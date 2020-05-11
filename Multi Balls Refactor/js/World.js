const BLOCK_W = 40;
const BLOCK_H = 40;
const BLOCK_GAP = 2;
const BLOCK_COLS = 20;
const BLOCK_ROWS = 15;
var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var trackGrid = [];
const OPEN_SPACE = 0;
const BLOCK_WALL = 1;
const PLAYERSTART = 2;
const BALL_START_POS = 4; // need to remove after placing 

function returnTileTypeAtColRow(col, row) {
    //console.log(col);
    //console.log(row);
    if(col >= 0 && col < BLOCK_COLS &&
        row >= 0 && row < BLOCK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord]);
    } else {

        return BLOCK_WALL;
    }
}

function carTrackHandling(whichCar) {
    
    var carTrackCol = Math.floor(whichCar.x / BLOCK_W);
    var carTrackRow = Math.floor(whichCar.y / BLOCK_H);
    //var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if(carTrackCol >= 0 && carTrackCol < BLOCK_COLS &&
        carTrackRow >= 0 && carTrackRow < BLOCK_ROWS) {

        var tileHere = returnTileTypeAtColRow(carTrackCol,carTrackRow);

        if(tileHere != OPEN_SPACE) {
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

            whichCar.speed *= -0.5; 

        } // end of track found
    } // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
    return col + BLOCK_COLS * row;
}

function drawWorld() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow=0;eachRow<BLOCK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<BLOCK_COLS;eachCol++) {
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere];

            switch(tileKindHere) {
                case OPEN_SPACE: colorRect(drawTileX,drawTileY, BLOCK_W, BLOCK_H, 'black'); break;
                case BLOCK_WALL: 
                    colorRect(drawTileX,drawTileY, BLOCK_W, BLOCK_H, 'black');
                    colorRect(drawTileX,drawTileY, BLOCK_W-BLOCK_GAP, BLOCK_H-BLOCK_GAP, 'blue');
            }
            //canvasContext.drawImage(useImg, drawTileX, drawTileY)
            drawTileX += BLOCK_W;
            arrayIndex += 1;
        } // end of for each track
        drawTileY += BLOCK_H;
        drawTileX = 0;
    } // end of for each row

} // end of drawWorld func
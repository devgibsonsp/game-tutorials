var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

// starting with a single ball
var testBall = new ballClass(80,310);


var ballArray = [];
const NUM_BALLS = 40;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0,0,canvas.width, canvas.height, "black");
    colorText("LOADING IMAGES",canvas.width/2, canvas.height/2), 'white';
    loadImages();
    initializeBalls();

    
}

function initializeBalls() {


        ballCount = NUM_BALLS;
        while(ballCount > 0) {
            var col = generateRandomNumber(BLOCK_ROWS);
            var row = generateRandomNumber(BLOCK_COLS);
            if(returnTileTypeAtColRow(row,col) == OPEN_SPACE 
                                    && col !== BLOCK_ROWS
                                    && row !== BLOCK_COLS) {
                ballArray.push(new ballClass(row*BLOCK_H,col*BLOCK_W,
                                            generateRandomNumber(2)+1,
                                            generateRandomNumber(2)+1));
                ballCount -= 1;
            }
        }

       
    
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function imageLoadingDoneSoStartGame() {

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    setupInput();
    

    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice();
    greenCar.reset(otherCarPic, "Green Machine");
    blueCar.reset(carPic, "Blue Storm");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
    //carTrackHandling(blueCar);
    testBall.move();
    ballArray.forEach(ball => ball.move());
}

function drawAll() {
    drawWorld();
    blueCar.draw();
    greenCar.draw();
    testBall.draw();
    ballArray.forEach(ball => ball.draw());
   // foreach( ball in )
}

function ballClass(xPos,yPos, xSpeed, ySpeed) {

    this.ballX = xPos;
    this.ballY = yPos;

    this.ballSpeedX = xSpeed;
    this.ballSpeedY = ySpeed;

    this.bool = false;

    this.getPositionX = function(posX) {
        return Math.floor(posX/BLOCK_W);
    }

    this.getPositionY = function(posY) {
        return Math.floor(posY/BLOCK_H);
    }

    this.move = function() {
        colorCircle(this.ballX,this.ballY, 0, 'white');
        var prevX = this.ballX - this.ballSpeedX;
        var prevY = this.ballY - this.ballSpeedY;

        var prevBallRow = this.getPositionX(prevY);
        var prevBallCol = this.getPositionY(prevX);

        var ballRow = this.getPositionX(this.ballY);
        var ballCol = this.getPositionY(this.ballX);

        var bothTestsFailed = true;

        if(returnTileTypeAtColRow(this.getPositionX(this.ballX),this.getPositionY(this.ballY)) 
            == BLOCK_WALL) {

            if(prevBallRow != ballRow) {
                this.ballSpeedY *= -1;
                bothTestsFailed = false;
            }
            if(prevBallCol != ballCol) {
                this.ballSpeedX *= -1;
                bothTestsFailed = false;
            }


            if(bothTestsFailed) {
                this.ballSpeedX *= -1;
                this.ballSpeedY *= -1;
            }
          

        }
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
    }

    this.draw = function() {
        colorCircle(this.ballX,this.ballY, 0, 'white');
        
    }
}
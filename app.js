var canvas;
var canvasContext;
var ballx = 50;
var bally = 50;
var ballspeedx = 10;
var ballspeedy = 4;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 150;
const WINNING_SCORE = 10;

var showingWinScreen = false;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvasContext.canvas.width  = window.innerWidth;
    canvasContext.canvas.height = window.innerHeight;

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', 
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
}

function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
    }
    ballspeedx = -ballspeedx;
    ballx = canvas.width / 2;
    bally = canvas.height / 2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < bally - 35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > bally + 35) {
        paddle2Y -= 6;
    }
}

function moveEverything() {
    if(showingWinScreen) {
        return;
    }
    computerMovement();

    ballx += ballspeedx;
    bally += ballspeedy;

    if (ballx < 10) {
        if (bally > paddle1Y && bally < paddle1Y + PADDLE_HEIGHT) {
            ballspeedx = -ballspeedx;

            var deltaY = bally - (paddle1Y + PADDLE_HEIGHT / 2);
            ballspeedy = deltaY * 0.35;
        } else {
            player2Score++; // must be before ball reset
            ballReset();
        }
    }
    if (ballx > canvas.width - 10) {
        if (bally > paddle2Y && bally < paddle2Y + PADDLE_HEIGHT) {
            ballspeedx = -ballspeedx;

            var deltaY = bally - (paddle2Y + PADDLE_HEIGHT / 2);
            ballspeedy = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }
    if (bally < 2) {
        ballspeedy = -ballspeedy;
    }
    if (bally > canvas.height - 10) {
        ballspeedy = -ballspeedy;
    }
}

function drawNet() {
    colorRect(canvas.width / 2 - 1, 6, 4, 20, '#66D8FF');
    colorRect(canvas.width / 2 - 1, 41, 4, 20, '#66CBFF');
    colorRect(canvas.width / 2 - 1, 81, 4, 20, '#66A5FF');
    colorRect(canvas.width / 2 - 1, 121, 4, 20, '#6691FF');
    colorRect(canvas.width / 2 - 1, 161, 4, 20, '#6675FF');
    colorRect(canvas.width / 2 - 1, 201, 4, 20, '#6866FF');
    colorRect(canvas.width / 2 - 1, 241, 4, 20, '#7766FF');
    colorRect(canvas.width / 2 - 1, 281, 4, 20, '#8E66FF');
    colorRect(canvas.width / 2 - 1, 321, 4, 20, '#9B66FF');
    colorRect(canvas.width / 2 - 1, 361, 4, 20, '#AD66FF');
    colorRect(canvas.width / 2 - 1, 401, 4, 20, '#C666FF');
    colorRect(canvas.width / 2 - 1, 441, 4, 20, '#C666FF');
    colorRect(canvas.width / 2 - 1, 481, 4, 20, '#EA66FF');
    colorRect(canvas.width / 2 - 1, 521, 4, 20, '#D366FF');
    colorRect(canvas.width / 2 - 1, 561, 4, 20, '#AA66FF');
    colorRect(canvas.width / 2 - 1, 601, 4, 20, '#7566FF');
    colorRect(canvas.width / 2 - 1, 641, 4, 20, '#8C7FFF');
    colorRect(canvas.width / 2 - 1, 681, 4, 20, '#7FA9FF');
    colorRect(canvas.width / 2 - 1, 721, 4, 20, '#82D3FF');
    colorRect(canvas.width / 2 - 1, 761, 4, 20, '#66F2FF');
}

function drawEverything() {
    // next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if (showingWinScreen) {
        canvasContext.fillStyle = '#EA66FF';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText('Left player won!', (canvas.width / 2) - 150, 200);
        } else if(player2Score >= WINNING_SCORE) {
            canvasContext.fillText('Right player won!', (canvas.width / 2) - 150, 200);
        }
        canvasContext.fillText("click to continue", (canvas.width / 2) - 130, 560);
        return;
    }

    drawNet();

    // left player paddle  
    var grdPadd = canvasContext.createLinearGradient(0, canvas.height / 2 + 150,15,0);
    grdPadd.addColorStop(0, "#66D8FF");
    grdPadd.addColorStop(1, "#EA66FF");

    // Fill with gradient
    canvasContext.fillStyle = grdPadd;
    canvasContext.fillRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // right player paddle
    var grdPadd2 = canvasContext.createLinearGradient(0, canvas.height / 2 + 150,15,0);
    grdPadd2.addColorStop(0, "#66D8FF");
    grdPadd2.addColorStop(1, "#EA66FF");

    // Fill with gradient
    canvasContext.fillStyle = grdPadd2;
    colorRect(canvas.width - 10, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // draws the ball
    colorCircle(ballx, bally, 10, 'aqua');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.shadowColor = "#F8CEFF";
    canvasContext.shadowBlur = 30;
    canvasContext.font = "30px Verdana"
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius) {
    // Create gradient
    var grd = canvasContext.createLinearGradient(100, 200, 200, 0);
    grd.addColorStop(0, "#66D8FF");
    grd.addColorStop(1, "#EA66FF");

    // Fill with gradient
    canvasContext.fillStyle = grd;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    canvasContext.fill();

}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

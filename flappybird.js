let birdY = 250;
let velocity = 0;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;
let pipes = [];
let gameState = 'start'; // 'start', 'playing', 'gameOver'
let score = 0;
let highScore = 0;
let accumulatedPoints = 0;
const PIPE_GAP = 200;
const PIPE_WIDTH = 50;
const PIPE_INTERVAL = 200;
const PIPE_SPEED = 2;

const gameContainer = document.getElementById('game-container');

function startGame() {
    gameState = 'playing';
    birdY = 250;
    velocity = 0;
    pipes = [];
    score = 0;
    renderGame();
}

function jump() {
    if (gameState === 'playing') {
        velocity = JUMP_STRENGTH;
    }
}

function renderGame() {
    gameContainer.innerHTML = `<div style="position: absolute; left: 50px; top: ${birdY}px; width: 30px; height: 30px; background-color: yellow; border-radius: 50%;"></div>`;

    pipes.forEach((pipe) => {
        gameContainer.innerHTML += `
            <div style="position: absolute; left: ${pipe.x}px; top: 0; width: ${PIPE_WIDTH}px; height: ${pipe.height}px; background-color: green;"></div>
            <div style="position: absolute; left: ${pipe.x}px; top: ${pipe.height + PIPE_GAP}px; width: ${PIPE_WIDTH}px; height: 100%; background-color: green;"></div>
        `;
    });

    if (gameState === 'playing') {
        document.getElementById('proceed-btn').style.display = score >= 5 ? 'block' : 'none';
    }

    gameContainer.innerHTML += `<div>Score: ${score}</div><div>High Score: ${highScore}</div>`;
}

function gameLoop() {
    if (gameState === 'playing') {
        birdY += velocity;
        velocity += GRAVITY;

        pipes.forEach((pipe) => {
            pipe.x -= PIPE_SPEED;
            if (pipe.x < 50 && !pipe.passed) {
                score++;
                pipe.passed = true;
            }
        });

        pipes = pipes.filter((pipe) => pipe.x > -PIPE_WIDTH);

        if (pipes.length === 0 || pipes[pipes.length - 1].x < 400 - PIPE_INTERVAL) {
            const height = Math.random() * 300 + 100;
            pipes.push({ x: 400, height: height, passed: false });
        }

        if (birdY > 500 || birdY < 0) {
            gameState = 'gameOver';
        }

        renderGame();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (gameState === 'start') {
            startGame();
        } else {
            jump();
        }
    }
});

setInterval(gameLoop, 20);

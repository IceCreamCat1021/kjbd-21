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

// Check if game container is being selected
if (gameContainer) {
    console.log("Game container found!");
} else {
    console.error("Game container NOT found!");
}

function startGame() {
    console.log("Game started");
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
    // Clear the game container
    gameContainer.innerHTML = '';

    // Render the bird
    const bird = document.createElement('div');
    bird.style.position = 'absolute';
    bird.style.left = '50px';
    bird.style.top = `${birdY}px`;
    bird.style.width = '30px';
    bird.style.height = '30px';
    bird.style.backgroundColor = 'yellow';
    bird.style.borderRadius = '50%';
    gameContainer.appendChild(bird);

    // Render the pipes
    pipes.forEach((pipe) => {
        const topPipe = document.createElement('div');
        topPipe.style.position = 'absolute';
        topPipe.style.left = `${pipe.x}px`;
        topPipe.style.top = '0';
        topPipe.style.width = `${PIPE_WIDTH}px`;
        topPipe.style.height = `${pipe.height}px`;
        topPipe.style.backgroundColor = 'green';
        gameContainer.appendChild(topPipe);

        const bottomPipe = document.createElement('div');
        bottomPipe.style.position = 'absolute';
        bottomPipe.style.left = `${pipe.x}px`;
        bottomPipe.style.top = `${pipe.height + PIPE_GAP}px`;
        bottomPipe.style.width = `${PIPE_WIDTH}px`;
        bottomPipe.style.height = '100%';
        bottomPipe.style.backgroundColor = 'green';
        gameContainer.appendChild(bottomPipe);
    });

    // Display the score
    const scoreDisplay = document.createElement('div');
    scoreDisplay.innerHTML = `Score: ${score}`;
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '10px';
    scoreDisplay.style.left = '10px';
    gameContainer.appendChild(scoreDisplay);
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

// Start game when space is pressed
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (gameState === 'start') {
            startGame();
        } else {
            jump();
        }
    }
});

// Set up the game loop
setInterval(gameLoop, 20);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const speed = 5;
let gameRunning = true;

const player1 = { x: 100, y: -50, width: 40, height: 40, color: "blue", health: 100, shield: 100, shieldActive: false, message: "" };
const player2 = { x: 600, y: -50, width: 40, height: 40, color: "red", health: 100, shield: 100, shieldActive: false, message: "" };

let bullets = [];
const keys = { 
    w: false, a: false, s: false, d: false,  // Player 1
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false // Player 2
};

// 🎮 Event Listeners for Player Movement
document.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
document.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

// 🎮 Move Player Function
function movePlayers() {
    if (keys.a && player1.x > 0) player1.x -= speed;
    if (keys.d && player1.x + player1.width < canvas.width) player1.x += speed;
    if (keys.w && player1.y > 0) player1.y -= speed;
    if (keys.s && player1.y + player1.height < canvas.height) player1.y += speed;

    if (keys.ArrowLeft && player2.x > 0) player2.x -= speed;
    if (keys.ArrowRight && player2.x + player2.width < canvas.width) player2.x += speed;
    if (keys.ArrowUp && player2.y > 0) player2.y -= speed;
    if (keys.ArrowDown && player2.y + player2.height < canvas.height) player2.y += speed;
}

// 🕹️ Game Loop
function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    movePlayers();
    drawPlayer(player1);
    drawPlayer(player2);
    drawMessage(player1);
    drawMessage(player2);

    requestAnimationFrame(gameLoop);
}

// 🎭 Draw Player
function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 🎭 Draw Player Messages
function drawMessage(player) {
    if (player.message) {
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(player.message, player.x - 10, player.y - 10);
    }
}

// 🔄 Restart Game & Drop Players
function restartGame() {
    player1.x = 100; player1.y = -50; player2.x = 600; player2.y = -50;
    player1.health = 100; player2.health = 100; gameRunning = false;
    dropPlayers();
}

// 🎬 Drop Players with Animation
function dropPlayers() {
    let dropSpeed = 5;

    function animateDrop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (player1.y < 300) player1.y += dropSpeed;
        if (player2.y < 300) player2.y += dropSpeed;

        drawPlayer(player1);
        drawPlayer(player2);

        if (player1.y >= 300 && player2.y >= 300) {
            player1.message = "Player 1!";
            player2.message = "Player 2!";
            
            setTimeout(() => {
                player1.message = "";
                player2.message = "";
            }, 2000);
            
            gameRunning = true;
            gameLoop();
            return;
        }

        requestAnimationFrame(animateDrop);
    }
    
    animateDrop();
}

// 🚀 Start Game
dropPlayers();

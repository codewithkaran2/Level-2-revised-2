const canvas = document.getElementById("gameCanvas"); const ctx = canvas.getContext("2d");

canvas.width = 800; canvas.height = 400;

const speed = 5; let gameRunning = true;

const player1 = { x: 100, y: -50, width: 40, height: 40, color: "blue", health: 100, shield: 100, shieldActive: false }; const player2 = { x: 600, y: -50, width: 40, height: 40, color: "red", health: 100, shield: 100, shieldActive: false };

let bullets = []; const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false, q: false, m: false };

document.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });

document.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

function gameLoop() { if (!gameRunning) return;

ctx.clearRect(0, 0, canvas.width, canvas.height);
drawPlayer(player1);
drawPlayer(player2);
requestAnimationFrame(gameLoop);

}

function drawPlayer(player) { ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height); }

function restartGame() { player1.x = 100; player1.y = -50; player2.x = 600; player2.y = -50; player1.health = 100; player2.health = 100; gameRunning = true; dropPlayers(); }

function dropPlayers() { let dropSpeed = 5; function animateDrop() { ctx.clearRect(0, 0, canvas.width, canvas.height); if (player1.y < 300) player1.y += dropSpeed; if (player2.y < 300) player2.y += dropSpeed; drawPlayer(player1); drawPlayer(player2);

if (player1.y >= 300 && player2.y >= 300) {
        showNotification("🟦 Player 1 says: Player 1!");
        showNotification("🟥 Player 2 says: Player 2!");
        gameRunning = true;
        gameLoop();
        return;
    }
    requestAnimationFrame(animateDrop);
}
animateDrop();

}

function showNotification(message) { let notification = document.createElement("div"); notification.innerText = message; notification.style.position = "absolute"; notification.style.top = "50px"; notification.style.left = "50%"; notification.style.transform = "translateX(-50%)"; notification.style.backgroundColor = "black"; notification.style.color = "white"; notification.style.padding = "10px 20px"; notification.style.borderRadius = "5px"; notification.style.fontSize = "18px"; notification.style.fontWeight = "bold"; document.body.appendChild(notification); setTimeout(() => { document.body.removeChild(notification); }, 2000); }

dropPlayers();

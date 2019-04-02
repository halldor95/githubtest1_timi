// undirbúum canvas fyrir teikningu
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// gerum einingabox, leikhraða og einingafærslu
var box = 48;
var playerInitX = 10 * box;
var playerInitY = 13.5 * box;
var moveUnit = 0.35;
var gameSpeed = 6;
var score = 0;
setInterval(stig, 100);
var life = 3;
setInterval(lvl, 5000);
var playerImg = document.getElementById('player');
var enemyImg = document.getElementById('enemy');
var backgroundImg = document.getElementById('background');

backgroundMusic = new Audio();
backgroundMusic.src = 'The Glitch Mob - A Dream Within A Dream.mp3';
backgroundMusic.volume = 0.30;
backgroundMusic.play();
backgroundMusic.addEventListener('ended', function(){
	backgroundMusic.play();
});

function stig() {
    score += 10;
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "silver";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLife() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "silver";
    ctx.fillText("Líf eftir: " + life, 100, 20);
}

var d;


function changeDirection(event) {
    if (event.type == "keyup") { d = ""; } else if (event.keyCode == 37) { d = "LEFT"; } else if (event.keyCode == 39) { d = "RIGHT"; }

}



// gerum kallinn okkar
var player = {
    height: 52,
    color: "#DB2B39",
    width: 32,
    x: playerInitX,
    y: playerInitY,
    x_velocity: 0,
};




var enemies = [];

function enemy(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.draw = function() {

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.endPath();

    }
}

function lvl(event) {
    var newEnemy = new enemy(Math.floor(Math.random() * 19 + 1) * box, 1.5 * box, "#6CBEED", box, box);
    enemies.push(newEnemy);
}




// gerum fall sem athugar hvort árekstur hafi orðið
function collision(hero, enemy) {
    if (hero.x < enemy.x + enemy.width &&
        hero.x + hero.width > enemy.x &&
        hero.y < enemy.y + enemy.height &&
        hero.y + hero.height > enemy.y) {
        return true;
    }
    return false;
}

// fall sem endurræsir leikinn
function restart(e) {
    if (e.keyCode == 32) {
        clearInterval(game);
        location.reload();
        score = 0;
        game = setInterval(draw, gameSpeed);
        player = {
            x: 10 * box,
            y: 13.5 * box,
            color: "#DB2B39",
            width: box,
            height: box
        };
        d = "";
        enemies[0].x = Math.floor(Math.random() * 19 + 1) * box;
        enemies[0].y = Math.floor(Math.random() * 3 + 1) * box;
        backgroundMusic.src = "";
        backgroundMusic.src = "The Glitch Mob - A Dream Within A Dream.mp3";
        backgroundMusic.play();
    }
}

function resetPlayer() {
    player.x = playerInitX;
    player.y = playerInitY;
    player.x_velocity = 0;
}

function resetEnemies() {
	enemies = [];
	// for(var i in enemies) {
	// 	enemies[i];
	// }
}

var img = document.getElementById("image")

// teiknifall
function draw() {
    //ctx.fillStyle = "blue";
    ctx.drawImage(backgroundImg, 0, 0, 960, 960);

    for (let i = 0; i < enemies.length; i++) {
        ctx.fillStyle = enemies[i].color;
        ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        enemies[i].y += moveUnit + 1.5;
        if (enemies[i].y >= 720) {
            enemies[i].x = Math.floor(Math.random() * 19 + 1) * box;
            enemies[i].y = 2 * box;
        }
        // ef það hefur orðið árekstur þá stoppum við leikinn
        if (collision(player, enemies[i])) {
            if (life == 1) {
                alert("Þú ert dauður. Þú varst með " + score + " Stig");
                clearInterval(game);
            } else {
                alert("Þú misstir líf...");
                resetEnemies();
                resetPlayer();
                life--;
            }
        }
    }

    drawScore();
    drawLife();

    if (d == "LEFT" && player.x >= 0) {
        player.x_velocity -= moveUnit;
    } else if (d == "RIGHT" && player.x <= 960 - box) {
        player.x_velocity += moveUnit;
    }

    player.x_velocity *= 0.9;
    player.x += player.x_velocity;
    //console.log(player.x_velocity)

    ctx.fillStyle = player.color;
    ctx.drawImage(playerImg, player.x, player.y, box, box);
    //ctx.fillRect(player.x, player.y, box, box);

}
document.addEventListener("keyup", changeDirection);
document.addEventListener("keydown", changeDirection);
document.addEventListener("keypress", restart);


// setjum af stað leikjalykkju
var game = setInterval(draw, gameSpeed);
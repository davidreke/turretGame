const icons = ["images/david.png", "images/robert.png", "images/garret.png"];
const btnStart = document.querySelector('.btnStart');
const gameOverEle = document.getElementById('gameOverEle');
const container =document.getElementById('container');
let gamePlay = false;
let player;
let animateGame;
const box = document.querySelector('.box');
const base = document.querySelector('.base');
const scoreDash = document.querySelector('.scoreDash');
const progressbar = document.querySelector('.progress-bar');
const gamePlayArea = document.querySelector('.gamePlayArea');

// var rect=box.getBoundingClientRect();
// console.log(rect);

const boxCenter = [box.offsetLeft + (box.offsetWidth/2),
    box.offsetTop + (box.offsetHeight/2)
];

btnStart.addEventListener('click',startGame);
container.addEventListener('mousedown',mouseDown);
container.addEventListener('mousemove', movePosition);


function startGame() {
    gamePlay = true;
    gameOverEle.style.display = 'none';
    player = {
        score: 0,
        barwidth: 100,
        lives: 100
    }
    setupBadguys(6)
    animateGame = requestAnimationFrame(playGame)
}

function moveEnemy() {
    let tempEnemy = document.querySelectorAll('.baddy');
    let hitter = false;
    let tempShots= document.querySelectorAll('.fireme');
    for (let enemy of tempEnemy) {
        if (enemy.offsetTop > 800 || enemy.offsetTop < 0 || enemy.offsetLeft > 1000 || enemy.offsetLeft < 0) {
            enemy.parentNode.removeChild(enemy);
            badmaker()
        }
        else {
            enemy.style.top = enemy.offsetTop + enemy.movery + 'px';
            enemy.style.left = enemy.offsetLeft + enemy.moverx + 'px';

            for(let shot of tempShots){
                if(isCollide(shot,enemy)&& gamePlay){
                    console.log('hit');
                    player.score += enemy.points;
                    enemy.parentNode.removeChild(enemy);
                    shot.parentNode.removeChild(shot);
                    updateDash();
                    badmaker();
                    break;
                }
            }
        }
        if (isCollide(box, enemy)) {
            hitter = true;
            player.lives--;
            if (player.lives < 0){gameOver();
            }
        }
        
    }
    if(hitter){
        base.style.backgroundColor = 'red';
        hitter = false;
    }
    else{
        base.style.backgroundColor = '';
    }
}

function gameOver(){
    cancelAnimationFrame(animateGame);
    gameOverEle.style.display = 'block';
    gameOverEle.querySelector('span').innerHTML = 'GAME OVER <br> Your Score is ' +player.score;
    gamePlay = false;
    let tempEnemy = document.querySelectorAll('.baddy');
    for(let enemy of tempEnemy){
        enemy.parentNode.removeChild(enemy);
    }
    let tempShots = document.querySelectorAll('.fireme');
    for (let shot of tempShots) {
        shot.parentNode.removeChild(shot);
    }
}

function updateDash() {
    scoreDash.innerHTML = player.score;
    let tempPer = (player.lives / player.barwidth)*100 +'%';
    progressbar.style.width = tempPer;
}

function movePosition(e){
    let deg = getDeg(e);
    // document.body.style.backgroundImage = "url('turretGame/turretGameEdited/images/loopmandan.png')";
    box.style.webkitTransform = 'rotate(' + deg + 'deg)';
    box.style.mozTransform = 'rotate(' + deg + 'deg)';
    box.style.msTransform = 'rotate(' + deg + 'deg)';
    box.style.oTransform = 'rotate(' + deg + 'deg)';
    box.style.transform = 'rotate(' + deg + 'deg)';
}

function isCollide(a , b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return!(
         (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))  
}

function getDeg(e){
    let angle = Math.atan2(e.clientX - boxCenter[0] - gamePlayArea.offsetLeft, -(e.clientY - boxCenter[1]));
    return angle * (180 / Math.PI);

}

function degRad(deg){
    return deg *(Math.PI / 180);
}

function mouseDown(e) {
    if (gamePlay) {
        let div = document.createElement('div');
        let deg = getDeg(e);
        div.setAttribute('class', 'fireme');
        console.log('fire');
        div.moverx = 5*Math.sin(degRad(deg));
        div.movery = -5*Math.cos(degRad(deg));
        div.style.left = (boxCenter[0]-5) + 'px';
        div.style.top = (boxCenter[1]-5) + 'px';
        div.style.width = 10 + 'px';
        div.style.height = 10 + 'px';
        container.appendChild(div);
        // move shots

        // update dashboard

        // move enemy
        
    }
}



function setupBadguys(num) {
    for (let x = 0; x < num; x++) {
        badmaker();
    }
}

function randomMe(num) {
    return Math.floor(Math.random() * num);{
        badmaker();
    }
}



function badmaker(){
    let div = document.createElement('div');
    let myIcon =icons[randomMe(icons.length)];
    let x, y, xmove, ymove;
    let randomStart = randomMe(4);
    let dirSet = randomMe(5) + 2;
    let dirPos = randomMe(7) - 3;
    switch (randomStart) {
        case 0:
            x = 0;
            y = randomMe(800);
            ymove = dirPos;
            xmove = dirSet;
        break;
        case 1:
            x = 1000;
            y = randomMe(800);
            ymove = dirPos;
            xmove = dirSet * -1;
            console.log('case1');
        break;
        case 2:
            x = randomMe(1000);
            y = 0;
            ymove = dirSet;
            xmove = dirPos;
        break;
        case 3:
            x = randomMe(1000);
            y = 800;
            ymove = dirSet * -1;
            xmove = dirPos;
            console.log('case3');
        break;
    }

    div.style.color=randomColor();
    div.style.backgroundImage = "url('"+myIcon+"')";
    div.setAttribute('class', 'baddy');
    div.style.height = '100px';
    div.style.width = '100px';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.moverx = xmove;
    div.movery = ymove;
    div.points = randomMe(5)+1;
    container.appendChild(div);
}

function randomColor(){
    function c(){
        let hex = randomMe(256).toString(16);
        return ('0'+String(hex)).substr(-2); 
    }
    return '#'+c()+c()+c();
}

function moveShots(){
    let tempShots = document.querySelectorAll('.fireme');
    for(let shot of tempShots){

        if(shot.offsetTop > 800 || shot.offsetTop < 0||shot.offsetLeft > 1000||shot.offsetLeft < 0){
            shot.parentNode.removeChild(shot);
        } 
        else{
        shot.style.top = shot.offsetTop + shot.movery + 'px';
        shot.style.left = shot.offsetLeft + shot.moverx + 'px';
        }
    }
}

function playGame(){
    if (gamePlay){
        moveShots();
        moveEnemy();
        updateDash();
        animateGame = requestAnimationFrame(playGame);
    }
    
}
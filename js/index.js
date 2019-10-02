const icons = ["bars", "bug", "bowling-ball", "coffee", "couch", "football-ball", "gem", "laptop"];
const btnStart = document.querySelector('.btnStart');
const gameOverEle = document.getElementById('gameOverEle');
const container =document.getElementById('container');
let gamePlay = false;
let player;
let animateGame;
const box = document.querySelector('.box');
const boxCenter = [box.offsetLeft + (box.offsetWidth/2),
    box.offsetTop + (box.offsetHeight/2)
];

btnStart.addEventListener('click',startGame);
container.addEventListener('mousedown',mouseDown);
container.addEventListener('mousemove', movePosition);


function movePosition(e){
    let deg = getDeg(e);
    let mouseAngle = getDeg(e);
    box.style.transform = 'rotate('+deg+'deg)';
}

function getDeg(e){
    let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]));
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

function startGame(){
    gamePlay = true;
    gameOverEle.style.display = 'none';
    player = {
        score: 0,
        barwidth: 100,
        lives: 100
    }
    setupBadguys(10);
    animateGame = requestAnimationFrame(playGame)
}

function setupBadguys(num) {
    for (let x=0; x < num; x++) {
        badmaker();
    }
}


function randomMe(num) {
    return Math.floor(Math.random() * num);
}

function moveEnemy(){
    let tempEnemy = document.querySelectorAll('.baddy');
    for(let enemy of tempEnemy){
        if(enemy.offsetTop > 50||enemy.offsetTop < 0||enemy.offsetLeft>750||enemy.offsetLeft < 0){
            enemy.parentNode.removeChild(enemy);
        }else{
        enemy.style.top = enemy.offsetTop + enemy.movery + 'px';
        enemy.style.left = enemy.offsetLeft +enemy.moverx + 'px';
    }
}

function badmaker(){
    let div = document.createElement('div');
    let myIcon = 'fa-' + icons[randomMe(icons.length)];
    let x, y, xmove, ymove;
    let randomStart = randomMe(4);
    let dirSet = randomMe(5) + 2;
    let dirPos = randomMe(7) - 3;
    switch (randomStart) {
        case 0:
            x = 0;
            y = randomMe(600);
            ymove = dirPos;
            xmove = dirSet;
        break;
        case 1:
            x = 800;
            y = randomMe(600);
            ymove = dirPos;
            xmove = dirSet * -1;
        break;
        case 2:
            x = randomMe(800);
            y = 0;
            ymove = dirSet;
            xmove = dirPos;
        break;
        case 3:
            x = randomMe(800);
            y = 600;
            ymove = dirSet * -1;
            xmove = dirPos;
        break;
    }
}
    div.innerHTML = '<i class="fas ' + myIcon + '"></i>';
    div.setAttribute('class', 'baddy');
    div.style.fontSize = randomMe(20) + 30 + 'px';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.moverx = xmove;
    div.movery = ymove;
    container.appendChild(div);
}

function moveShots(){
    let tempShots = document.querySelectorAll('.fireme');
    for(let shot of tempShots){

        if(shot.offsetTop > 600 || shot.offsetTop < 0||shot.offsetLeft > 800||shot.offsetLeft < 0){
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
        animateGame = requestAnimationFrame(playGame);
    }
    
}

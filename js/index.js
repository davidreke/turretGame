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
    console.log(mouseAngle);
}

function getDeg(e){
    let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]));
    return angle * (180 / Math.PI);

}

function mouseDown(e){
    if(gamePlay){
        // move shots

        // update dashboard

        // move enemy
        animateGame = requestAnimationFrame(playGame);
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
    // setup badguys
    animateGame= requestAnimationFrame(playGame)
}

function playGame(){
  
    
}


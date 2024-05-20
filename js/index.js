// Game Constants & Variables
let inputdir = { x: 0, y: 0 }
const foodSound = new Audio('assets/food.mp3');
const gameoverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
const bgm = new Audio('assets/background music.mp3')
let speed = 4
let score = 0
let lastpaintTime = 0
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 7, y: 8 }

// Gamefunctions
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return
    }
    lastpaintTime = ctime
    gameEngine()
}
function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            return true
        }
    }
    // if you bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true
    }
}
function gameEngine() {
    bgm.play()
    // part1:Updating the snake array & Food
    if (isCollide(snakearr)) {
        gameoverSound.play()
        bgm.pause()
        inputdir = { x: 0, y: 0 }
        alert("Game Over Press any key to play again")
        snakearr = [{ x: 13, y: 15 }]
        bgm.play()
        score = 0
    }
    // If you have eaten the food ,increment the score and regenerate the food
    if (snakearr[0].y == food.y && snakearr[0].x == food.x) {
        foodSound.play()
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y })
        score+=1
        score.innerHTML="score: "+score
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Move the snake 
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] }
    }
    snakearr[0].x += inputdir.x
    snakearr[0].y += inputdir.y

    // part2:Display the snake & Food
    // Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // Display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}



// Main logic starts here
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 } // Start the Game
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputdir.x = 0
            inputdir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputdir.x = 0
            inputdir.y = 1
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputdir.x = -1
            inputdir.y = 0
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputdir.x = 1
            inputdir.y = 0
            break;
    }
})
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gaveOver = false;
let foodX, foodY;
let snakeX = 13 , snakeY = 10;
let snakeBody = [];
let vercityX = 0 , vercityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0; //getting high score from local storage
highScoreElement.innerText=`High Score: ${highScore}`;

const changeFoodPostion = () =>{
    //passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) +1 ;
    foodY = Math.floor(Math.random() * 30) +1 ;
}

const handleGameOver = () =>{
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Gave over! Press ok to replay");
    location.reload();
}

const changeDirection = (e) =>{
    //checking velocity value based on key press
    if(e.key === "ArrowUp" && vercityY != 1){
        vercityX = 0;
        vercityY = -1;
    } else if(e.key === "ArrowDown" && vercityY != -1){
        vercityX = 0;
        vercityY = 1;
    } else if(e.key === "ArrowLeft" && vercityX != 1){
        vercityX = -1;
        vercityY = 0;
    } else if(e.key === "ArrowRight" && vercityX != -1){
        vercityX = 1;
        vercityY = 0;
    }
}

const initGame = () => {
    if(gaveOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`;
    
    //checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPostion();
        snakeBody.push([foodX , foodY]);//pushing food position to snake body array
        score += 10;
        highScore = score >= highScore ? score: highScore;
        localStorage.setItem("high-score" , highScore);
        scoreElement.innerText=`Score: ${score}`;
        highScoreElement.innerText=`High Score: ${highScore}`;
    }

    for (let  i= snakeBody.length - 1;  i >0; i--){
        //shifting forward the value of the elements in the snake body by one
        snakeBody[i] = snakeBody[i -1];
    }

    //setting first position of the snake body to current snake position
    snakeBody[0] = [snakeX , snakeY];
    
    //updating the snake head position  base on the current vector
    snakeX += vercityX;
    snakeY += vercityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gaveOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++){

        //adding div for each part of the snake body
        htmlMarkup += `<div class="snake" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //checking if the snake hits the body , if so gameover to true
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gaveOver = true;
        }
    }  
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPostion();
setIntervalId = setInterval(initGame , 150);
document.addEventListener("keydown" , changeDirection);
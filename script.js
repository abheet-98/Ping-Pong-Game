let x = true;
let y = true;
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBounds = board.getBoundingClientRect();
let leftPlayerLives = 3;
let rightPlayerLives = 3;


function setColor(index){
    let allicons = document.querySelectorAll(".fas.fa-circle");
    allicons[index].style.color = "purple";
}


// user input listen
document.addEventListener("keydown",function(e){

    if(e.key == "w"){
        movePaddle(leftPaddle,-window.innerHeight*0.1);
    }
    else if(e.key == "s"){
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }
    else if(e.key == "ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }
    else if(e.key == "ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
    // console.log(e);
})

function movePaddle(cPaddle,change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();

    if(cPaddleBounds.top + change >= boardBounds.top && cPaddleBounds.bottom + change <= boardBounds.bottom){
        cPaddle.style.top = cPaddleBounds.top+change+"px";
    }
}



function moveBall(){
    let ballcoord = ball.getBoundingClientRect();
    let ballTop = ballcoord.top;
    let ballLeft = ballcoord.left;
    let ballBottom = ballcoord.bottom;
    let ballRight = ballcoord.right;


    // check if collided with any players horizontal boundary
    let hasTouchedLeft = ballLeft<boardBounds.left;
    let hasTouchedRight = ballRight>boardBounds.right;

    if(hasTouchedLeft || hasTouchedRight){

        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives == 0){
                alert("GAME OVER\n Player 2 wins");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
        else{
            rightPlayerLives--;
            setColor(3+rightPlayerLives);
            if(rightPlayerLives == 0){
                alert("GAME OVER\n Player 1 wins");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }

    }

    function resetGame(){
        ball.style.top = window.innerHeight*0.45+"px";
        ball.style.left = window.innerWidth*0.45+"px";
    
        requestAnimationFrame(moveBall);
    }


    if(ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom ){
        y = !y;
    }


    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop + 30 >= leftPaddleBounds.top && ballBottom - 30 <= leftPaddleBounds.bottom){
        x = !x;
    }

    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop + 30 >= rightPaddleBounds.top && ballBottom - 30 <= rightPaddleBounds.bottom){
        x = !x;
    }

    ball.style.top = y==true ? ballTop+4+"px" : ballTop-4+"px";
    ball.style.left = x==true ? ballLeft+4+"px" : ballLeft-4+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);


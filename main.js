let container = document.getElementById('container');
let basket = document.getElementById('basket');
let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
let basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue('bottom'));

//moving the monkey
//move key
function moveBasketLeft(){
    if(basketLeft > 0){
       basketLeft -= 15;
       basket.style.left = basketLeft + 'px';
    }
}

function moveBasketRight(){
    if(basketLeft < 1230){
        basketLeft += 15;
        basket.style.left = basketLeft + 'px';
    }
}

function moveBasketKeyboard(e){
   if(e.key === 'ArrowLeft'){
    moveBasketLeft();
   }
   if(e.key === "ArrowRight"){
    moveBasketRight();
   }
}
document.addEventListener('keydown', moveBasketKeyboard);

//move mouse
function moveBasketMouse(e){
    let basketWidth = 8;
    let mouseX = e.clientX - basketWidth / 2;
    if(mouseX >= 0 && mouseX <= 1230){
        basket.style.left = mouseX + 'px';
    }
}
document.addEventListener('mousemove', moveBasketMouse);

//generate bananas
let bananas = document.getElementById('bananas');
let lowerLimit = 0;
let bananaCaughtCount = 0;
let bananaMissedCount = 0;
let scoreCount = 0;
let gameover = false;

function generateBanana(){
    let bananaBottom = 470;
    let bananaLeft = Math.floor(Math.random() * 1220);
    let banana = document.createElement('img');
    banana.src = "./assets/banana.png";
    banana.alt = 'Banana';
    banana.className = 'banana';
    bananas.appendChild(banana);


function fallingBanana(){
    bananaBottom -= 5;
    banana.style.bottom = bananaBottom + 'px';
    banana.style.left = bananaLeft + 'px';

    if(bananaBottom <= lowerLimit){
        banana.remove();

        if(bananaBottom > lowerLimit - 5 && !banana.classList.contains('caught')){
           bananaMissedCount++;

            let bananaMissed = document.getElementById('missed');
            bananaMissed.innerHTML = `BANANA MISSED: ${bananaMissedCount}`; 
        }
        
    }else{
        detectCollision(banana);
    }


}

//check collision of the banana with the basket
function detectCollision(banana){
    let bananaRect = banana.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();

    if(bananaRect.left < basketRect.right && bananaRect.right > basketRect.left 
        && bananaRect.top < basketRect.bottom && bananaRect.bottom > basketRect.top){
            banana.classList.add('caught');
            banana.remove();
            bananaCaughtCount++;
            scoreCount += 5;

            let bananaCaught = document.getElementById('caught');
            bananaCaught.innerHTML = `BANANA CAUGHT: ${ bananaCaughtCount}`;

            let score = document.getElementById('score');
            score.innerHTML = `SCORE: ${scoreCount}`;
   }
    if(bananaMissedCount >= 5 && !gameover){
       clearInterval(interval);
       clearTimeout(time);
       let basket = document.getElementById('basket');
       basket.src = '/assets/monkey-laugh.png';

       let text = document.createElement('h1');
       text.classList.add('text-center', 'text');
       text.innerHTML = 'YOU LOSE!';

       let resetBtn = document.createElement('button');
       resetBtn.innerHTML = 'RESET';
       resetBtn.className = 'btn btn-danger';

       resetBtn.addEventListener('click', function(){
        location.reload();
       })

       container.append(text, resetBtn);
       gameover = true;
    }

}
    let interval = setInterval(fallingBanana, 20);
    let time = setTimeout(generateBanana, 2000);
}



let playBtn = document.getElementById('imgPlay');
playBtn.addEventListener('click', function(){
    console.log(`Button clicked`)
    let divPlay = document.getElementById('divPlay');
    divPlay.style.visibility = 'hidden';
    
    let countdown = document.querySelector('.countdown');
    countdown.style.display = 'block';
    let count = 3;
    let countInterval = setInterval(()=>{
        count--;
        countdown.textContent = count;
        if(count === 0){
            clearInterval(countInterval);
            countdown.style.display = 'none';
            basket.style.display = 'block';

            let sound = new Audio("./assets/MarimbaBoy.wav");
            sound.loop = true;
            sound.play();

            sound.addEventListener('ended', ()=>{
                this.currentTime = 0;
                this.play();
            })
               generateBanana();
        }
    },1000);
    
})



/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player must get a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, max = 10, winningNum = getRandomNum(min, max), guessesLeft = 4;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again eventlistener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);

    // Validade
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Error! Please enter a number between ${min} and ${max}`, 'red')
    } else {
        // Check if won
        if (guess === winningNum){
            gameOver(true, `${winningNum} is correct. Congratulations!`)
        } else {
            // Wrong number
            guessesLeft -= 1;
            if (guessesLeft === 0){
                // Game Over
                gameOver(false, `Game Over! The correct number was ${winningNum}`)
            } else {
                // Game continues
                guessInput.style.borderColor = 'blue';
                guessInput.value = '';
                setMessage(`You guessed wrong. Try again! Guesses left: ${guessesLeft}`, 'blue');
            }
        }
    }
    
})

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Message
    setMessage(msg, color);
    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Random Number
function getRandomNum(min, max){
    return(Math.floor(Math.random()*(max-min+1)+min));
}
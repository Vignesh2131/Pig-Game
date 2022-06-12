'use strict';

///Selecting elements///
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let scores, currScore, activePlayer, playing;
///Starting conditions///
const init = function () {

    
    scores = [0, 0];
    currScore = 0;
    activePlayer = 0;
    playing = true;
    score0.textContent = '0';
    score1.textContent = '0';
    dice.classList.add('hidden');
    current0.textContent = '0';
    current1.textContent = '0';
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    
}
init();

const switching = function () {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
        activePlayer = activePlayer === 0 ? 1 : 0;
        currScore = 0;
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
}


//rolling the dice//
rollDice.addEventListener('click', function () {

    if (playing) {
        //1.Generating the random number
    const random = Math.trunc(Math.random() * 6) + 1;
    
    //2.Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${random}.png`;

    //3.Check for rolled 1 : if true switch the player
    if (random !== 1) {
        //add dice to current score
        currScore += random;
        document.getElementById(`current--${activePlayer}`).textContent = currScore;
        
    } else {
        //switch the player
        switching();
    }
    }
    
});


//Holding the dice
hold.addEventListener('click', function () {
    if (playing) {
        //1.Add current score to active player's score
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2.Check if player's score  is =>100
    if (scores[activePlayer] >= 50) {
        playing = false;
        dice.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        //3.Switch to next player
        switching();
         }
    }
    
});

//New game//

newGame.addEventListener('click', init);
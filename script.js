'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//function for player switch
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

/* starting conditions 
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');*/
 
let currentScore , activePlayer , scores , playing;

const init = function()
{
  // starting conditions
 scores = [0,0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;

  // current score of both players set to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  // player score of both the player set to 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  // display dice 
  diceEl.classList.add("hidden");           // typo error

  // resetting the player overlay
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};

init();

//Rolling Dice Functionality
btnRoll.addEventListener('click', function(){
if(playing){

   //1. Generating  a random dice roll
   const dice = Math.trunc(Math.random() * 6) + 1; 
   
   //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

   //3. check for rolled 1: if true , switch to next player
   if(dice !== 1){
    // add dice to current score 
       currentScore += dice; 
       document.getElementById(`current--${activePlayer}`).textContent = currentScore ;
       
   }else{
     // switch to next player
      switchPlayer();
   }
}
});

btnHold.addEventListener('click',function(){
    if(playing)
    {
   // add current score to active player score 
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
   // check if players score is already 100 i.e, >=100
     if(scores[activePlayer] >= 100) {
       // finish game
       playing = false;
       diceEl.classList.add('hidden');
       document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
       document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
     } else{
       // switch to the next player
       switchPlayer();
     }
    }
});


// New game button

btnNew.addEventListener('click', init);




// extra things done by me!!
//Modal for "How to Play Button" 
const modal = document.querySelector('.closeHelp');

//Button Functionality for how to play button!
const helpButton = document.querySelector('.help');
helpButton.addEventListener('click', function(){
modal.classList.remove('hidden');
overlay.classList.remove('hidden');
});

// function definition of close modal 
const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

//button functionality for close button!
const closeButton = document.querySelector('.closeButton');
closeButton.addEventListener('click',closeModal);

// functionality for clicking and pressing escape for removal of overlay!
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown',function(e){
    console.log(e.key);
    if(e.key === 'Escape' && !modal.classList.contains('hidden'))
        closeModal();
});



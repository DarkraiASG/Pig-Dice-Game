// Idea is when there will be one on dice...the score will reset to zero and the active player will be changed
// Player wins if his score >= 100

"use strict";

// Selecing elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");

let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");

let diceEl = document.querySelector(".dice");

// Selecing button elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0, 0]; // big scores
let currentScore = 0;
let activePlayer = 0;

let playing = true;

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if current ActivePlayer is 0 then switch it to 1 else current ActivePlayer is 1 then switch it to

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing === true) {
    // 1.Generate a Random Dice Roll--------------------------------------
    let randomDiceNum = Math.floor(Math.random() * 6) + 1;

    // 2.Display Dice----------------------------------------------------------
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDiceNum}.png`;

    // 3.Check for rolled --------------------------------------------------

    if (randomDiceNum !== 1) {
      // add dice to current score

      currentScore = currentScore + randomDiceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    // 1.Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
});

const gameBody = document.querySelector(".game-body");
const gameBoard = document.querySelector(".game-board");
const startGameBtn = document.querySelector(".start-game");
const numbersButton = document.querySelector(".numbers");
const iconsButton = document.querySelector(".icons");
const gameStartScreen = document.querySelector(".start-game-screen");
const onePlayerButton = document.querySelector(".one-player");
const TwoPlayersButton = document.querySelector(".two-players");
const threePlayersButton = document.querySelector(".three-players");
const fourPlayersButton = document.querySelector(".four-players");
const grid4Button = document.querySelector(".grid-4");
const grid6Button = document.querySelector(".grid-6");
const multiplayerScores = document.querySelector(".multiplayer-scores");
const soloScores = document.querySelector(".solo-time-moves");
const multiplayerModal = document.querySelector(".multiplayer-game-over");
const multiplayerModalContent = document.querySelector(".modal-content");
const soloModal = document.querySelector(".modal-solo-game-over");
const modalTime = soloModal.querySelector(".time");
const modalTotalMoves = soloModal.querySelector(".moves-total");
const mobileMenuButton = document.querySelector(".btn-menu");
const mobileMenuModal = document.querySelector(".mobile-menu-modal");
const resumeGameButton = document.querySelector(".resume-game");

// Mobile Menu
mobileMenuButton.addEventListener("click", () => {
  mobileMenuModal.classList.remove("hidden");
  document.body.style.pointerEvents = "none";
  mobileMenuModal.style.pointerEvents = "auto";
  pauseTimer();
});

// Resume Game
resumeGameButton.addEventListener("click", () => {
  mobileMenuModal.classList.add("hidden");
  document.body.style.pointerEvents = "auto";
  resumeTimer();
});

// Start Game Menu
function startGame(button1, button2) {
  button1.addEventListener("click", () => {
    button1.classList.add("checked");
    button2.classList.remove("checked");
  });
}

// Function to Select theme
function selectTheme(numbersTheme, iconsTheme) {
  numbersTheme.addEventListener("click", () => {
    numbersTheme.classList.add("checked");
    iconsTheme.classList.remove("checked");
  });
}

// function to select number of players
function selectNumOfPlayers(player1, player2, player3, player4) {
  player1.addEventListener("click", () => {
    player1.classList.add("checked");
    player2.classList.remove("checked");
    player3.classList.remove("checked");
    player4.classList.remove("checked");
  });
}

// function to select grid
function selectGrid(gridNum4, gridNum6) {
  gridNum4.addEventListener("click", () => {
    gridNum4.classList.add("checked");
    gridNum6.classList.remove("checked");
  });
}

// Theme selection
selectTheme(numbersButton, iconsButton);
selectTheme(iconsButton, numbersButton);

// Player selection
selectNumOfPlayers(
  onePlayerButton,
  TwoPlayersButton,
  threePlayersButton,
  fourPlayersButton
);
selectNumOfPlayers(
  TwoPlayersButton,
  onePlayerButton,
  threePlayersButton,
  fourPlayersButton
);
selectNumOfPlayers(
  threePlayersButton,
  onePlayerButton,
  TwoPlayersButton,
  fourPlayersButton
);
selectNumOfPlayers(
  fourPlayersButton,
  onePlayerButton,
  TwoPlayersButton,
  threePlayersButton
);

// Grid Selection
selectGrid(grid4Button, grid6Button);
selectGrid(grid6Button, grid4Button);

// Start Game functionality
startGameBtn.addEventListener("click", () => {
  // If numbers theme is selected display game board with numbers else display icons theme
  if (numbersButton.classList.contains("checked")) {
    gameBoard.classList.add("numbers");
  } else if (iconsButton.classList.contains("checked")) {
    gameBoard.classList.add("icons");
  }

  // find number of players selected and display appropriate player board
  if (onePlayerButton.classList.contains("checked")) {
    // if one player display solo board
    gameBoard.classList.add("solo");
    multiplayerScores.classList.add("hidden");
    soloScores.classList.remove("hidden");
  } else if (TwoPlayersButton.classList.contains("checked")) {
    // if two players display two-player board
    gameBoard.classList.add("duo");
    // Remove player 3 and four
    multiplayerScores.children[2].classList.add("hidden");
    multiplayerScores.children[3].classList.add("hidden");
  } else if (threePlayersButton.classList.contains("checked")) {
    // if three players display three-player board
    gameBoard.classList.add("trio");
    // Remove player 4
    multiplayerScores.children[3].classList.add("hidden");
  } else {
    // display a multiplayer board
    gameBoard.classList.add("multiplayer");
  }

  // find grid type selected
  if (grid4Button.classList.contains("checked")) {
    // if 4x4 grid selected display 4x4 gameboard
    gameBoard.classList.add("grid-4");
  } else {
    // display 6x6 game board
    gameBoard.classList.add("grid-6");
  }

  // create new game
  createNewGame();
  // Hide start screen and show game board
  gameStartScreen.classList.add("hidden");
  gameBoard.classList.remove("hidden");
});

// function create new game
function createNewGame() {
  // create cards (either 4x4 or 6x6)
  createCards();
  // generate appropriate theme
  gameBoard.classList.contains("numbers")
    ? generateRandomNumbers()
    : generateRandomIcons();
  // Start game
  gameMode();
  finalResults();
}

// Menus for Game
const restartButton = document.querySelectorAll(".restart");
const newGameButton = document.querySelectorAll(".new-game");

// Restart game functionality
restartButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Hide all modals
    multiplayerModal.classList.add("hidden");
    soloModal.classList.add("hidden");
    mobileMenuModal.classList.add("hidden");
    // Reset multiplayer modal
    multiplayerModalContent.innerHTML = "";
    // Reset current game board
    resetGame();
    // generate theme for game board
    gameBoard.classList.contains("numbers")
      ? generateRandomNumbers()
      : generateRandomIcons();
    document.body.style.pointerEvents = "auto";
  });
});

// Remove cards
function removeCards() {
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    row.remove();
  });
}

// New Game functionality
newGameButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.reload();
    // // Hide all modals
    // multiplayerModal.classList.add("hidden");
    // soloModal.classList.add("hidden");
    // // Reset multiplayer modal
    // multiplayerModalContent.innerHTML = "";
    // // Hide game board and show game screen
    // gameBoard.classList.add("hidden");
    // gameBoard.classList.remove(
    //   "grid-4",
    //   "grid-6",
    //   "icons",
    //   "numbers",
    //   "solo",
    //   "duo",
    //   "trio",
    //   "multiplayer"
    // )
    // gameStartScreen.classList.remove("hidden");
    // // reset game
    // resetGame();
    // // remove cards
    // removeCards();
  });
});

let winnerText = document.querySelector("#player-winner");
let playerOne = multiplayerScores.children[0].querySelector(".p1-score");
let playerTwo = multiplayerScores.children[1].querySelector(".p2-score");
let playerThree = multiplayerScores.children[2].querySelector(".p3-score");
let playerFour = multiplayerScores.children[3].querySelector(".p4-score");

function playerModalShow() {
  // For 2-player
  if (gameBoard.classList.contains("duo")) {
    let scores = [];

    // Store scores in array
    scores.push([
      Number(
        multiplayerScores.children[0].querySelector(".p1-score").textContent
      ),
      "player-one",
      "p1-moves",
      "Player 1",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[1].querySelector(".p2-score").textContent
      ),
      "player-two",
      "p2-moves",
      "Player 2",
    ]);

    // Sort the array
    scores.sort((a, b) => b[0] - a[0]);

    // Get maximum score
    let numbersFromArr = scores.map((innerArr) => {
      return innerArr[0];
    });

    // Maximum Score
    let maxScore = Math.max(...numbersFromArr);
    let playerTie;
    let filterScores = scores.filter((innerArr) => {
      return innerArr[0] === Math.max(...numbersFromArr);
    });
    filterScores.length > 1 ? (playerTie = true) : (playerTie = false);
    if (playerTie) {
      winnerText.innerHTML = "It's a tie!";

      for (const score of scores) {
        if (score[0] === maxScore) {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]} (Winner!)</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    } else {
      for (const score of scores) {
        if (score[0] === maxScore) {
          winnerText.innerHTML = `${score[3]} wins!`;
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        } else {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]}"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    }
    multiplayerModal.classList.remove("hidden");
  }
  // For trio-player game
  else if (gameBoard.classList.contains("trio")) {
    let scores = [];

    // Store scores in array
    scores.push([
      Number(
        multiplayerScores.children[0].querySelector(".p1-score").textContent
      ),
      "player-one",
      "p1-moves",
      "Player 1",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[1].querySelector(".p2-score").textContent
      ),
      "player-two",
      "p2-moves",
      "Player 2",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[2].querySelector(".p3-score").textContent
      ),
      "player-three",
      "p3-moves",
      "Player 3",
    ]);

    // Sort the array
    scores.sort((a, b) => b[0] - a[0]);

    // Get maximum score
    let numbersFromArr = scores.map((innerArr) => {
      return innerArr[0];
    });

    // Maximum Score
    let maxScore = Math.max(...numbersFromArr);
    let playerTie;
    let filterScores = scores.filter((innerArr) => {
      return innerArr[0] === Math.max(...numbersFromArr);
    });
    filterScores.length > 1 ? (playerTie = true) : (playerTie = false);

    // Check for tie
    if (playerTie) {
      winnerText.innerHTML = "It's a tie!";
      for (const score of scores) {
        if (score[0] === maxScore) {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]} (Winner!)</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        } else {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]}"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    } else {
      for (const score of scores) {
        if (score[0] === maxScore) {
          winnerText.innerHTML = `${score[3]} wins!`;
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        } else {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]}"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    }
    multiplayerModal.classList.remove("hidden");
  }
  // Multiplayer game
  else if (gameBoard.classList.contains("multiplayer")) {
    let scores = [];
    // Store scores in array
    scores.push([
      Number(
        multiplayerScores.children[0].querySelector(".p1-score").textContent
      ),
      "player-one",
      "p1-moves",
      "Player 1",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[1].querySelector(".p2-score").textContent
      ),
      "player-two",
      "p2-moves",
      "Player 2",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[2].querySelector(".p3-score").textContent
      ),
      "player-three",
      "p3-moves",
      "Player 3",
    ]);
    scores.push([
      Number(
        multiplayerScores.children[3].querySelector(".p4-score").textContent
      ),
      "player-four",
      "p4-moves",
      "Player 4",
    ]);
    // Sort the array
    scores.sort((a, b) => b[0] - a[0]);
    // Get maximum score
    let numbersFromArr = scores.map((innerArr) => {
      return innerArr[0];
    });

    // Maximum Score
    let maxScore = Math.max(...numbersFromArr);
    let playerTie;
    let filterScores = scores.filter((innerArr) => {
      return innerArr[0] === Math.max(...numbersFromArr);
    });
    filterScores.length > 1 ? (playerTie = true) : (playerTie = false);
    // Check for tie
    if (playerTie) {
      winnerText.innerHTML = "It's a tie!";
      for (const score of scores) {
        if (score[0] === maxScore) {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]} (Winner!)</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        } else {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]}"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    } else {
      for (const score of scores) {
        if (score[0] === maxScore) {
          winnerText.innerHTML = `${score[3]} wins!`;
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]} active"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        } else {
          multiplayerModalContent.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-${score[1]}"> 
          <p>${score[3]}</p>
          <div class="${score[2]}">${score[0]} Pairs</div>
          </div>`
          );
        }
      }
    }
    multiplayerModal.classList.remove("hidden");
  } else {
    // for solo player game
    clearInterval(interval);
    modalTime.innerHTML = timer.innerHTML;
    modalTotalMoves.innerHTML = soloMovesCount.innerHTML + " Moves";

    soloModal.classList.remove("hidden");
  }
}

function finalResults() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const matchedCards = document.querySelectorAll(".matched");
      if (
        matchedCards.length === 16 &&
        gameBoard.classList.contains("grid-4")
      ) {
        // display result modal
        playerModalShow();
        document.body.style.pointerEvents = "none";
        soloModal.style.pointerEvents = "auto";
        multiplayerModal.style.pointerEvents = "auto";
      } else if (
        matchedCards.length === 36 &&
        gameBoard.classList.contains("grid-6")
      ) {
        // display result modal
        playerModalShow();
        document.body.style.pointerEvents = "none";
        soloModal.style.pointerEvents = "auto";
        multiplayerModal.style.pointerEvents = "auto";
      }
    });
  });
}

// Create Cards
function createCards() {
  // Create 4x4 grid
  if (gameBoard.classList.contains("grid-4")) {
    for (let i = 0; i < 4; i++) {
      // Create containers
      const row = document.createElement("div");
      // append a class of row to each div
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 4; i++) {
        // Create card element
        const card = document.createElement("div");
        card.classList.add("card");
        row.appendChild(card);
      }
    });
  }
  // Create 6x6 grid
  else if (gameBoard.classList.contains("grid-6")) {
    for (let i = 0; i < 6; i++) {
      // Create containers
      const row = document.createElement("div");
      // append a class of row to each div
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 6; i++) {
        // Create card element
        const card = document.createElement("div");
        card.classList.add("card", "grid6");
        row.appendChild(card);
      }
    });
  }
}

// Generate random Numbers
function generateRandomNumbers() {
  // Get cards
  const cards = document.querySelectorAll(".card");
  // Create array of cards
  let ArrayOf4Cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  let ArrayOf6Cards = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
  ];

  // Generate card for 4x4 grid
  if (gameBoard.classList.contains("grid-4")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf4Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf4Cards[randomNumber];
      // Remove that element from the array
      ArrayOf4Cards.splice(randomNumber, 1);
      // Append p to the card as child
      card.appendChild(p);
    });
  }
  // Generate cards for 6x6 grid
  else if (gameBoard.classList.contains("grid-6")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf6Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf6Cards[randomNumber];
      ArrayOf6Cards.splice(randomNumber, 1);
      card.appendChild(p);
    });
  }
}

function generateRandomIcons() {
  // Get cards
  const cards = document.querySelectorAll(".card");
  let ArrayOf4Icons = [
    "theater-masks",
    "theater-masks",
    "gem",
    "gem",
    "surprise",
    "surprise",
    "snowflake",
    "snowflake",
    "toolbox",
    "toolbox",
    "hockey-puck",
    "hockey-puck",
    "headphones",
    "headphones",
    "atom",
    "atom",
  ];
  let ArrayOf6Icons = [
    "torah",
    "torah",
    "surprise",
    "surprise",
    "snowflake",
    "snowflake",
    "journal-whills",
    "journal-whills",
    "toolbox",
    "toolbox",
    "khanda",
    "khanda",
    "hockey-puck",
    "hockey-puck",
    "headphones",
    "headphones",
    "gem",
    "gem",
    "globe",
    "globe",
    "dove",
    "dove",
    "chess-knight",
    "chess-knight",
    "biohazard",
    "biohazard",
    "atom",
    "atom",
    "theater-masks",
    "theater-masks",
    "yin-yang",
    "yin-yang",
    "parachute-box",
    "parachute-box",
    "hourglass-half",
    "hourglass-half",
  ];
  // Generate Icons for 4x4 grid
  if (gameBoard.classList.contains("grid-4")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf4Icons.length);
      const i = document.createElement("i");
      i.classList.add("fas", `fa-${ArrayOf4Icons[randomNumber]}`);
      // Remove that element from the array
      ArrayOf4Icons.splice(randomNumber, 1);
      // Append i to the card as child
      card.appendChild(i);
    });
  }
  //Generate Icons for 6x6 grid
  else if (gameBoard.classList.contains("grid-6")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf6Icons.length);
      const i = document.createElement("i");
      i.classList.add("fas", `fa-${ArrayOf6Icons[randomNumber]}`);
      // Remove that element from the array
      ArrayOf6Icons.splice(randomNumber, 1);
      // Append i to the card as child
      card.appendChild(i);
    });
  }
}

let flippedCards = [];
const soloMovesCount = document.querySelector(".moves-count");
let moves = 0;

function checkPairs() {
  // Get number of cards flipped
  const numberOfCardsFlipped = document.querySelectorAll(".flip").length;
  const cardsFlipped = document.querySelectorAll(".flip");
  // Check if two pairs match
  // For Numbers grid
  if (
    gameBoard.classList.contains("numbers") &&
    numberOfCardsFlipped === 2 &&
    cardsFlipped[0].firstChild.innerHTML ===
      cardsFlipped[1].firstChild.innerHTML
  ) {
    // Add a matched class to each flipped card
    cardsFlipped.forEach((card) => {
      card.classList.add("matched");
    });
  }

  // For icons grid
  if (
    gameBoard.classList.contains("icons") &&
    numberOfCardsFlipped === 2 &&
    cardsFlipped[0].firstChild.classList[1] ===
      cardsFlipped[1].firstChild.classList[1]
  ) {
    // Add a matched class to each flipped card
    cardsFlipped.forEach((card) => {
      card.classList.add("matched");
    });
  }

  // If flipped cards exceed 2 reset
  if (numberOfCardsFlipped >= 2) {
    // Increase moves count for solo player
    moves++;
    soloMovesCount.innerHTML = moves;
    cardsFlipped.forEach((card) => {
      setTimeout(() => {
        // remove flip class
        card.classList.remove("flip");
        // reset array
        flippedCards = [];
      }, 600);
    });
  }
}

let currentPlayer = 0;

// Check for next player
function nextPlayer() {
  const numberOfCardsFlipped = document.querySelectorAll(".flip").length;

  if (numberOfCardsFlipped === 2) {
    if (gameBoard.classList.contains("duo")) {
      // Check for player turn
      if (multiplayerScores.children[0].classList.contains("active")) {
        setTimeout(() => {
          multiplayerScores.children[1].classList.add("active");
          multiplayerScores.children[0].classList.remove("active");
        }, 600);
      } else {
        setTimeout(() => {
          multiplayerScores.children[0].classList.add("active");
          multiplayerScores.children[1].classList.remove("active");
        }, 600);
      }
    } else if (gameBoard.classList.contains("trio")) {
      setTimeout(() => {
        // remove active class from current player
        multiplayerScores.children[currentPlayer].classList.remove("active");
        // increment current player index
        currentPlayer = (currentPlayer + 1) % 3;
        // assign active class to the current player
        multiplayerScores.children[currentPlayer].classList.add("active");
      }, 600);
    } else if (gameBoard.classList.contains("multiplayer")) {
      setTimeout(() => {
        // remove active class from current player
        multiplayerScores.children[currentPlayer].classList.remove("active");
        // increment current player index
        currentPlayer = (currentPlayer + 1) % 4;
        // assign active class to the current player
        multiplayerScores.children[currentPlayer].classList.add("active");
      }, 600);
    }
  }
}

let playerOneScore = document.querySelector(".p1-score");
let playerTwoScore = document.querySelector(".p2-score");
let playerThreeScore = document.querySelector(".p3-score");
let playerFourScore = document.querySelector(".p4-score");

// Update player score
function updateCurrentPlayerScore() {
  // for duo player
  if (gameBoard.classList.contains("duo")) {
    if (multiplayerScores.children[0].classList.contains("active")) {
      // multiplayerScores.children[0].querySelector(".p1-score").textContent
      playerOneScore.innerHTML = Number(playerOneScore.innerHTML) + 1;
    } else if (multiplayerScores.children[1].classList.contains("active")) {
      playerTwoScore.innerHTML = Number(playerTwoScore.innerHTML) + 1;
    }
  }
  if (gameBoard.classList.contains("trio")) {
    if (multiplayerScores.children[0].classList.contains("active")) {
      // multiplayerScores.children[0].querySelector(".p1-score").textContent
      playerOneScore.innerHTML = Number(playerOneScore.innerHTML) + 1;
    } else if (multiplayerScores.children[1].classList.contains("active")) {
      playerTwoScore.innerHTML = Number(playerTwoScore.innerHTML) + 1;
    } else if (multiplayerScores.children[2].classList.contains("active")) {
      playerThreeScore.innerHTML = Number(playerThreeScore.innerHTML) + 1;
    }
  }
  if (gameBoard.classList.contains("multiplayer")) {
    if (multiplayerScores.children[0].classList.contains("active")) {
      // multiplayerScores.children[0].querySelector(".p1-score").textContent
      playerOneScore.innerHTML = Number(playerOneScore.innerHTML) + 1;
    } else if (multiplayerScores.children[1].classList.contains("active")) {
      playerTwoScore.innerHTML = Number(playerTwoScore.innerHTML) + 1;
    } else if (multiplayerScores.children[2].classList.contains("active")) {
      playerThreeScore.innerHTML = Number(playerThreeScore.innerHTML) + 1;
    } else if (multiplayerScores.children[3].classList.contains("active")) {
      playerFourScore.innerHTML = Number(playerFourScore.innerHTML) + 1;
    }
  }
}

let minutes = 0;
let seconds = 0;
let interval;
let done = false;
const timer = document.querySelector(".timer");

// Start timer
function startTimer() {
  if (!done) {
    done = true;
    interval = setInterval(() => {
      timer.textContent = `${minutes}:${
        seconds <= 9 ? "0" + seconds : seconds
      }`;
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    }, 1000);
  }
}

// Pause timer
function pauseTimer() {
  if (done) {
    done = false;
    clearInterval(interval);
  }
}

// resume timer
function resumeTimer() {
  if (!done) {
    done = true;
    interval = setInterval(() => {
      timer.textContent = `${minutes}:${
        seconds <= 9 ? "0" + seconds : seconds
      }`;
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    }, 1000);
  }
}

function resetGame() {
  // Get cards
  const cards = document.querySelectorAll(".card");
  // Get multiplayer scores children
  const multiScores = multiplayerScores.children;
  currentPlayer = 0;
  // for solo game
  moves = 0;
  soloMovesCount.innerHTML = 0;
  minutes = 0;
  seconds = 1;
  timer.innerHTML = "0:00";
  clearInterval(interval);
  done = false;
  // for multiplayer game
  Array.from(multiScores).forEach((child) => {
    child.classList.remove("active");
    child.querySelector("div").innerHTML = 0;
  });
  // Remove flip and matched classes from card
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove("flip");
    card.classList.remove("matched");
  });
  multiScores[0].classList.add("active");
}

// Game mode logic
function gameMode() {
  // Get Cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // start timer
      startTimer();
      card.classList.add("flip");
      flippedCards.push(card);
      // Check pairs
      checkPairs();

      // Check for player turn
      if (!card.classList.contains("matched")) {
        nextPlayer();
      }
      if (card.classList.contains("matched")) {
        // update player score
        updateCurrentPlayerScore();
      }
    });
  });
}

// generateRandomNumbers()
// generateRandomIcons()
// createNewGame()
// createCards()

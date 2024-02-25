//This JS file is for controlling the functionality of the 
//Rock-Paper-Scissors game


//Sola
var wins = 0;
var losses = 0;
var ties = 0;

var playerThrows = document.querySelectorAll('.player-select-container');
var computerThrowContainer = document.getElementById('computer-select-container');
var computerThrowText = document.querySelector('#computer-container h3');

var winsDisplay = document.getElementById('wins');
var lossesDisplay = document.getElementById('losses');
var tiesDisplay = document.getElementById('ties');

playerThrows.forEach(function (throwContainer) {
    throwContainer.addEventListener('click', playerThrowClickHandler);
});

function playerThrowClickHandler() {
    playerThrows.forEach(function (container) {
        container.classList.remove('selected');
    });

    this.classList.add('selected');

    setTimeout(function () {
        displayRandomThrows(); 
        setTimeout(function () {
            var computerThrowResult = getComputerThrow();
            displayComputerThrow(computerThrowResult);
            determineWinner(this, computerThrowResult);
        }.bind(this), 3000);
    }.bind(this), 500);
}


function displayRandomThrows() {
    var throws = ['rock', 'paper', 'scissors'];
    var interval = setInterval(function () {
        var randomIndex = Math.floor(Math.random() * throws.length);
        var randomThrow = throws[randomIndex];
        computerThrowContainer.innerHTML = '<img src="image/' + randomThrow + '.PNG" alt="' + randomThrow + '">';
    }, 500);

   
    setTimeout(function () {
        clearInterval(interval);
    }, 2500);
}

function getComputerThrow() {
    var throws = ['rock', 'paper', 'scissors'];
    var randomIndex = Math.floor(Math.random() * throws.length);
    return throws[randomIndex];
}

function displayComputerThrow(throwResult) {
    computerThrowContainer.innerHTML = '<img src="image/' + throwResult + '.PNG" alt="' + throwResult + '">';
}

// Samantha 

function determineWinner(playerChoice, computerChoice) {
    var outcomeMessage = '';
    var playerChoiceValue = playerChoice.dataset.choice;

    if (playerChoiceValue === computerChoice) {
        ties++;
        outcomeMessage = 'It\'s a Tie!';
    } else if (
        (playerChoiceValue === 'rock' && computerChoice === 'scissors') ||
        (playerChoiceValue === 'paper' && computerChoice === 'rock') ||
        (playerChoiceValue === 'scissors' && computerChoice === 'paper')
    ) {
        wins++;
        outcomeMessage = 'You Win!';
    } else {
        losses++;
        outcomeMessage = 'You Lose!';
    }

    document.querySelector('.win-lose-container').textContent = outcomeMessage;

    
    updateScoreCounts();
}


function updateScoreCounts() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    tiesDisplay.textContent = ties;
}

function playAgain() {
    playerThrows.forEach(function (container) {
        container.classList.remove('selected');
    });

    computerThrowContainer.innerHTML = '<img class="cycle" src="image/question-mark.PNG" alt="Question Mark">';
    computerThrowText.textContent = 'Computer Throw!';

    document.querySelector('.win-lose-container').textContent = 'Win or lose?';

    wins = 0;
    losses = 0;
    ties = 0;
    updateScoreCounts();
}
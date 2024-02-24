document.addEventListener("DOMContentLoaded", function () {
    // Player and computer throw containers
    var playerThrows = document.querySelectorAll('.player-select-container');
    var computerThrow = document.getElementById('result-container');

    // Score containers
    var winsDisplay = document.getElementById('wins');
    var lossesDisplay = document.getElementById('losses');
    var tiesDisplay = document.getElementById('ties');

    // Reset button
    var resetButton = document.querySelector('button');
    resetButton.addEventListener('click', resetGame);

    // Event listeners for player throws
    playerThrows.forEach(function (throwContainer) {
        throwContainer.addEventListener('click', playerThrowClickHandler);
    });

    // Function to handle player throw click
    function playerThrowClickHandler() {
        // Reset borders
        playerThrows.forEach(function (container) {
            container.classList.remove('selected');
        });

        // Mark selected throw
        this.classList.add('selected');

        // Determine computer throw after a delay
        setTimeout(function () {
            var computerThrowResult = getComputerThrow();
            displayComputerThrow(computerThrowResult);
            determineWinner(this, computerThrowResult);
        }.bind(this), 3000);
    }

    // Function to get a random computer throw
    function getComputerThrow() {
        var throws = ['rock', 'paper', 'scissors'];
        var randomIndex = Math.floor(Math.random() * throws.length);
        return throws[randomIndex];
    }

    // Function to display computer throw
    function displayComputerThrow(throwResult) {
        computerThrow.innerHTML = '<img src="image/' + throwResult + '.PNG" alt="' + throwResult + '">';
    }

    // Function to determine the winner and update score
    // Function to determine the winner and update score
    function determineWinner(playerChoice, computerChoice) {
        var outcomeMessage = '';

        if (playerChoice === computerChoice) {
            ties++;
            outcomeMessage = 'It\'s a Tie!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            wins++;
            outcomeMessage = 'You Win!';
        } else {
            losses++;
            outcomeMessage = 'You Lose!';
        }

        // Update outcome displays
        outcomeContainer.textContent = outcomeMessage;

        // Update score displays
        updateScoreCounts();
    }

    // Function to update the outcome section
    function updateOutcome(message) {
        var outcomeContainer = document.getElementById('score-container');
        outcomeContainer.innerHTML += ' ' + message + ' <button onclick="resetGame()">Play Again</button>';
        updateScoreCounts();
    }

    function updateScoreCounts() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }

    // Function to reset the game
    function resetGame() {
        // Remove borders from player throws
        playerThrows.forEach(function (container) {
            container.classList.remove('selected');
        });

        // Reset computer throw section
        computerThrow.innerHTML = '<img src="image/question-mark.PNG" alt="Question Mark" id="question-mark">';

        // Reset outcome section
        var outcomeContainer = document.getElementById('score-container');
        outcomeContainer.innerHTML = 'Wins: <span id="wins">0</span> | Losses: <span id="losses">0</span> | Ties: <span id="ties">0</span> <button onclick="resetGame()">Play Again</button>';

        // Reset score counters
        winsDisplay.textContent = '0';
        lossesDisplay.textContent = '0';
        tiesDisplay.textContent = '0';

        // Remove and reattach event listeners for player throws
        playerThrows.forEach(function (throwContainer) {
            var newThrowContainer = throwContainer.cloneNode(true);
            throwContainer.parentNode.replaceChild(newThrowContainer, throwContainer);

            newThrowContainer.addEventListener('click', playerThrowClickHandler);
        });
    }
});
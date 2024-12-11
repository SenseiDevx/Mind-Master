let colors = ['red', 'blue', 'green', 'yellow', 'white', 'purple'];
let secretCode = [];
let currentGuess = [];
let turn = 0;
let gameOver = false;
let currentColor = "";

// Инициализация игры
function initialize() {
    // Генерация случайного секретного кода
    secretCode = [];
    for (let i = 0; i < 4; i++) {
        secretCode.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    currentGuess = [];
    turn = 0;
    gameOver = false;
    currentColor = "";
    updateStatus("Game Started. Make your first guess.");
    resetAnswerBoxes();
}

// Обработка выбранного цвета
function selectedColor(color) {
    if (gameOver) {
        alert("Game over! Please restart the game.");
        return;
    }
    currentColor = color;
}

// Установка цвета в ячейку ответа
function pasteColor(boxId) {
    if (!currentColor) {
        alert("Please select a color first.");
        return;
    }
    let box = document.getElementById(boxId);
    let boxIndex = parseInt(boxId.replace("box", "")) - 1;
    currentGuess[boxIndex] = currentColor;
    box.src = `TermProjectResources/${capitalize(currentColor)}Rectangle.GIF`;
}

// Проверка ответа
function checkAnswer() {
    if (gameOver) {
        alert("Game over! Please restart the game.");
        return;
    }
    if (currentGuess.length < 4 || currentGuess.includes(undefined)) {
        alert("All Answer Boxes must be filled with a Color prior to Check Answer.");
        return;
    }
    turn++;

    let correct = 0;
    let otherClues = 0;
    let codeCopy = [...secretCode];
    let guessCopy = [...currentGuess];

    // Сначала ищем правильные позиции
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            correct++;
            codeCopy[i] = guessCopy[i] = null;
        }
    }

    // Затем ищем оставшиеся цвета
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
            otherClues++;
            codeCopy[codeCopy.indexOf(guessCopy[i])] = null;
        }
    }

    displayClues(correct, otherClues);

    if (correct === 4) {
        showWin();
    } else if (turn >= 10) {
        showLoss();
    } else {
        updateStatus(`Turn ${turn}: Guess again.`);
        currentGuess = [];
    }
}

// Обновленная функция подсказок
function displayClues(correct, otherClues) {
    let clues = [];

    for (let i = 0; i < correct; i++) {
        clues.push("X");
    }
    for (let i = 0; i < otherClues; i++) {
        clues.push("O");
    }

    document.getElementById("gameMessage").innerText = `Clues: ${clues.join(' ')}`;
}

// Вывод победного сообщения
function showWin() {
    gameOver = true;
    document.getElementById("gameMessage").innerText =
        `You won in ${turn} turn(s): WOW! You are lucky! Secret code was ${secretCode.join(', ')}.`;
}

// Вывод сообщения о поражении
function showLoss() {
    gameOver = true;
    document.getElementById("gameMessage").innerText =
        `You lost. Secret code was ${secretCode.join(', ')}. Try again!`;
}

// Перезапуск игры
function newGame() {
    initialize();
}

// Открытие окна справки
function showHelp() {
    window.open("userhelp.htm", "Help", "width=300,height=400,scrollbars=yes");
}

// Сброс ячеек ответа
function resetAnswerBoxes() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`box${i}`).src = "TermProjectResources/QuestionRectangle.GIF";
    }
}

// Обновление статуса игры
function updateStatus(message) {
    document.getElementById("status").innerText = message;
}

// Вспомогательная функция для капитализации
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

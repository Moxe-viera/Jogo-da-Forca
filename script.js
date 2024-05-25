const words = ['NAMORA COMIGO'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];
const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const hangmanParts = document.querySelectorAll('.part');
const keyboard = document.getElementById('keyboard');
const victoryMessage = document.getElementById('victoryMessage');
const congratsMessage = document.getElementById('congratsMessage');
const heartsContainer = document.getElementById('heartsContainer');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('key');
    button.innerText = letter;
    button.addEventListener('click', () => handleLetter(letter));
    keyboard.appendChild(button);
});

function displayWord() {
    wordDisplay.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : '_'}
            </span>
        `).join('')}
    `;
    const innerWord = wordDisplay.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord) {
        victoryMessage.classList.remove('hidden');
        congratsMessage.classList.remove('hidden');
        heartsContainer.classList.remove('hidden');
        createHearts();
    }
}

function updateWrongLetters() {
    wrongLettersDisplay.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Errado</p>' : ''}
        ${wrongLetters.join(', ')}
    `;
    hangmanParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    if(wrongLetters.length === hangmanParts.length) {
        alert('Você perdeu! Tente novamente.');
    }
}

function handleLetter(letter) {
    if(selectedWord.includes(letter)) {
        if(!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        }
    } else {
        if(!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
        }
    }
}

function createHearts() {
    for(let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        heartsContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

displayWord();

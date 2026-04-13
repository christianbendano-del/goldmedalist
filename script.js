// Listahan ng 15 images (magiging 30 total dahil may pairs)
// Siguraduhin na may folder ka na 'images' at may files na '1.png' hanggang '15.png'
const cardImages = [
    'b1.png', 'b1.png', 'b2.png', 'b2.png', 'b3.png', 'b3.png', 
    'b4.png', 'b4.png', 'b5.png', 'b5.png', 'b6.png', 'b6.png', 
    'b7.png', 'b7.png', 'b8.png', 'b8.png', 'b9.png', 'b9.png', 
    'b10.png', 'b10.png', 'b11.png', 'b11.png', 'b12.png', 'b12.png', 
    'b13.png', 'b13.png', 'b14.png', 'b14.png', 'b15.png', 'b15.png'
];

let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let canFlip = true; // Para maiwasan ang mabilisang click

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const grid = document.getElementById('gameGrid');
    const shuffled = shuffle([...cardImages]);
    grid.innerHTML = '';
    
    shuffled.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = imgSrc;

        const img = document.createElement('img');
        img.src = `images/${imgSrc}`; 
        
        card.appendChild(img);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').innerText = moves;
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedCount += 2;
        canFlip = true;

        if (matchedCount === cardImages.length) {
            setTimeout(() => alert(`Galing! Natapos mo sa ${moves} moves.`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function resetGame() {
    moves = 0;
    matchedCount = 0;
    flippedCards = [];
    document.getElementById('moves').innerText = moves;
    createBoard();
}

// Start the game
createBoard();
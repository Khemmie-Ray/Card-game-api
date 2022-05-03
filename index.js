let deckId;
let scoreCount1 = 0;
let scoreCount2 = 0;
const newCardDeck = document.getElementById('new-Deck');
const drawCard = document.getElementById('draw');
const imgCard = document.getElementById('cards');
const message = document.getElementById('message');
const pTop = document.getElementById('p-top');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

function newDecks() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
          deckId = data.deck_id;
        pTop.textContent = `Remaining cards: ${data.remaining}`
      })
}

newCardDeck.addEventListener('click', newDecks)

drawCard.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
        imgCard.innerHTML = 
        `<img class="card-img" src="${data.cards[0].image}" alt="">
        <img class="card-img" src="${data.cards[1].image}" alt="">
        `
        const winnerText = getWinner(data.cards[0], data.cards[1]);
        message.textContent = winnerText;
        pTop.textContent = `Remaining cards: ${data.remaining}`

        if(data.remaining === 0) {
            drawCard.disabled = true;
            if(scoreCount1 < scoreCount2) {
                message.textContent = 'You are a winner!'
            } else if (scoreCount1 > scoreCount2){
                message.textContent = 'The computer is a winner!'
            } else {
                message.textContent = 'it is a tie!'
            }
        }
    })
})


function getWinner(card1, card2) {
    const cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"];
    
    const card1Index = cardValue.indexOf(card1.value)
    const card2Index = cardValue.indexOf(card2.value)

    if(card1Index < card2Index) {
        scoreCount1++;
        score1.textContent = `Computer score: ${scoreCount1}`
        return 'Computer Wins!'
    } else if (card1Index > card2Index) {
        scoreCount2++;
        score2.textContent = `My score: ${scoreCount2}`
        return 'You win!'
    } else {
        return 'War'
    }
}
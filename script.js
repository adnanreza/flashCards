const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsDOM = [];

// Store card data
const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((dataItem, index) => createCard(dataItem, index));
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `<div class="inner-card">
                      <div class="inner-card-front">
                        <p>${data.question}</p>
                      </div>
                      <div class="inner-card-back">
                        <p>${data.answer}</p>
                      </div>
                    </div>`;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // add to DOM cards
  cardsDOM.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Set cards data to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsDOM.length}`;
}

createCards();

// Event Listeners

// Next Button
nextBtn.addEventListener('click', () => {
  cardsDOM[currentActiveCard].className = 'card left';
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsDOM.length - 1) {
    currentActiveCard = cardsDOM.length - 1;
  }

  cardsDOM[currentActiveCard].className = 'card active';
  updateCurrentText();
});

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsDOM[currentActiveCard].className = 'card right';
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsDOM[currentActiveCard].className = 'card active';
  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

// Hide add container
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    //create new card object
    const newCard = { question, answer };
    createCard(newCard);
    //clear values
    questionEl.value = '';
    answerEl.value = '';
    //update add container class
    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  } else {
    alert('Please add a question and answer');
  }
});

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const reset = document.querySelector('.btn__reset')
let overlay = document.querySelector('.start');
const lives = document.querySelector('#scoreboard ol');
const heading = document.querySelector('h2');

const phrases = [
  'The way to get started is to quit talking and begin doing',
  // Walt Disney
  'The future belongs to those who believe in the beauty of their dreams',
  // Eleanor Roosevelt
  'Tell me and I forget Teach me and I remember Involve me and I learn',
  // Benjamin Franklin
  'Life is never fair and perhaps it is a good thing for most of us that it is not',
  // Oscar Wilde
  'The purpose of our lives is to be happy'
  // Dalai Lama
];

const message = {
  win : `Yaaaay!! You Won!`,
  lose : `Awwww... You Lost.`
};

let phraseAsArray

function addPhraseToDisplay(array){
  let ul = document.querySelector("#phrase ul");
  for (let i=0; i<array.length; i++){

    let li = document.createElement("li");
    li.textContent = array[i];
    ul.appendChild(li);
    if (li.textContent != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}



reset.addEventListener('click', () => {
  // reset everything underneath first
    phrase.innerHTML = '<ul></ul>'
    resetHearts();
    missed = 0;
    resetKeys();
  overlay.style.display = "none";
  phraseAsArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseAsArray);
});




function getRandomPhraseAsArray(array) {
  const i = Math.floor((Math.random() * array.length));
  const selected = phrases[i].toUpperCase();

  // remove this phrase so they get a different one next time
  phrases.splice(i,1);

  // need to fix this so that it removes again next time...

  const newArray = selected.split("");
  return newArray;
};




function checkLetter(clickedLetter) {
  const letters = document.querySelectorAll('.letter');
  const upper = clickedLetter.toUpperCase();
  for (let i=0; i<letters.length; i++){
    if (letters[i].textContent === upper) {
      letters[i].className += " show";
    }
  }
  if (phraseAsArray.includes(upper)) {
    return(upper);
  } else {
    return(null);
  }
}

qwerty.addEventListener('click', (e) => {
  let target = e.target;
  if (target.tagName === "BUTTON") {
    target.className = "chosen";
    target.disabled = true;
  }
  let chosenLetter = target.textContent;
  let letterFound = checkLetter(chosenLetter);

  if (!letterFound) {
    missed++;
    i = (5 - missed);
    life = lives.getElementsByTagName("li")
    life[i].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">'
  }

  // checkWin
  const totalLetters = document.querySelectorAll('.letter');
  const totalShowing = document.querySelectorAll('.show');

  if (totalShowing.length === totalLetters.length){

    let appropriateMessage = message.win;
    console.log(appropriateMessage);
    heading.textContent = appropriateMessage;
    overlay.style.display = "";
  } else if (missed>=5){
    let appropriateMessage = message.lose;
    console.log(appropriateMessage);
    heading.textContent = appropriateMessage;
    overlay.style.display = "";
  }

})

function resetKeys() {
  let keys = qwerty.querySelectorAll('button')
  for (let i=0; i<keys.length; i++){
      keys[i].className = "";
      keys[i].disabled = false;
  }
}

function resetHearts() {
  life = lives.getElementsByTagName("li");
  for (let i=0; i<life.length; i++){
    life[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">'
  }
}


function showMessage() {
  // add the message
  heading.textContent = appropriateMessage;


  // show it
  overlay.style.display = "";
}


'use strict';
function updateAccuracy(correct) {
  cardsDrawn += 1;
  correctCount += correct;
  accuracy.innerHTML = Math.round(100 * correctCount / cardsDrawn);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function getCardLabel(card) {
  let cardContents = card.innerHTML;
  let startString = '<p style="display:none">';
  let endString = '</p>';
  var cardLabel = getSubstring(cardContents, startString , endString).trim();
  return cardLabel == "yes";
}

function initCards(card, index) {
  var currentCards = document.querySelectorAll('.card:not(.removed)');
  let totalActiveCards = currentCards.length;
  currentCards.forEach(function (card, index) {card.style.zIndex=totalActiveCards-index;});
  slideCardContainer.classList.add('loaded');
}

function createButtonListener(real) {
  return function (event) {
    var cards = document.querySelectorAll('.card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;
    if (!cards.length) return false;
    var card = cards[0];
    var labelWasReal = getCardLabel(card);
    var correctChoice = labelWasReal == real;
    updateAccuracy(correctChoice);
    card.classList.add('removed');
    if (real) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }
    loadNewCard();
    initCards();
    activateHammertime();
    event.preventDefault();
  };
}

function getSubstring(rawString, startChar, endChar) {
  var startIndex = rawString.indexOf(startChar) + startChar.length;
  var endIndex = rawString.indexOf(endChar);
  return rawString.substring(startIndex, endIndex);
}

function createArticleObj(stringArticle) {
  var article = {};
  article.title = getSubstring(stringArticle, ' title: ', " real: ").trim();
  article.title = article.title.substring(1, article.title.length-2);
  article.real = getSubstring(stringArticle, " real: ", " createdAt: ").trim();
  article.real = article.real.substring(1, article.real.length-2);
  return article;
}

function createArticleObjects() {
    var articlesString = document.getElementById('hiddenArticles').innerHTML;
    var splitArticlesString = articlesString.split("},{");
    var articles = new Array(splitArticlesString.length);
    splitArticlesString.forEach( function(stringArticle, index) {
        articles[index] = createArticleObj(stringArticle);
    });
    return articles;
};

function loadNewCard() {
    let cardThemes = ['arch', 'tech', 'nature', 'people'];
    var newCard = `<div class='card'><img src='https://placeimg.com/600/300/${cardThemes[newCardIndex%cardThemes.length]}'><h3>${articleObjects[newCardIndex].title}</h3><p style='display:none'>${articleObjects[newCardIndex].real}</p></div>`;
    // make sure index stays within bounds
    (newCardIndex == articleObjects.length-1) ? newCardIndex = 0 : newCardIndex++;
    document.getElementById("cardStack").innerHTML += newCard;
}

function startGame() {
  try{
    for (var i=0; i<2; i++){loadNewCard();} //number of initial cards
    initCards();
    activateHammertime();
    document.getElementById('onion').addEventListener('click', createButtonListener(false));
    document.getElementById('real').addEventListener('click', createButtonListener(true));
  } catch {window.alert("ERROR: failed to start game!");}
}



function activateHammertime() {
  var currentCards = document.querySelectorAll('.card:not(.removed)');
  currentCards.forEach(function (card) {
    var hammertime = new Hammer(card);

    hammertime.on('pan', function (event) {
      card.classList.add('moving');
    });

    hammertime.on('pan', function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      slideCardContainer.classList.toggle('real', event.deltaX > 0);
      slideCardContainer.classList.toggle('onion', event.deltaX < 0);

      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });

    hammertime.on('panend', function (event) {
      card.classList.remove('moving');
      slideCardContainer.classList.remove('real');
      slideCardContainer.classList.remove('onion');
      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
      event.target.classList.toggle('removed', !keep);
      if (keep) {
        event.target.style.transform = '';
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
        var playerVotedReal = event.deltaX > 0 ? 1 : 0;
        var labelWasReal = getCardLabel(card);  // this seems to be the issue
        var correctChoice = labelWasReal == playerVotedReal;
        updateAccuracy(correctChoice);
        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        loadNewCard();
        initCards();
        activateHammertime();
      }
    });
  });
}


/* MAIN */

var accuracy = document.getElementById("accuracy");
var correctCount = 0;
var cardsDrawn = 0;
var slideCardContainer = document.querySelector('.slideCardContainer');

const articleObjects = createArticleObjects();
shuffle(articleObjects);
var newCardIndex = 0;
startGame();
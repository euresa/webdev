
'use strict';

function updateAccuracy(correct) {
  cardsDrawn += 1;
  correctCount += correct;
  accuracy.innerHTML = `Accuracy: ${Math.round(100 * correctCount / cardsDrawn)}%`;
}

function getCardLabel(card) {
  let cardContents = card.innerHTML;
  let startSubstring = '<p style="display:none">';
  let endSubstring = '</p>';
  var cardLabel = cardContents.substring(
    cardContents.indexOf(startSubstring) + startSubstring.length,
    cardContents.indexOf(endSubstring)
  )
  return cardLabel;
}

var accuracy = document.getElementById("accuracy");
var correctCount = 0;
var cardsDrawn = 0;
var slidecardContainer = document.querySelector('.slidecardContainer');
var allCards = document.querySelectorAll('.card');
var onion = document.getElementById('onion');
var real = document.getElementById('real');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.card:not(.removed)');
  let totalCards = allCards.length;
  newCards.forEach(function (card, index) {
    card.style.zIndex = totalCards - index;
    card.style.transform = 'scale(' + (totalCards - index) / totalCards + ') translateY(-' + 300 * (index - 1) / totalCards + 'px)';
    card.style.opacity = ((totalCards - index) / totalCards) ** 2;
  });

  slidecardContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (card) {
  var hammertime = new Hammer(card);

  hammertime.on('pan', function (event) {
    card.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    slidecardContainer.classList.toggle('real', event.deltaX > 0);
    slidecardContainer.classList.toggle('onion', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    card.classList.remove('moving');
    slidecardContainer.classList.remove('real');
    slidecardContainer.classList.remove('onion');

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
      var cardLabel = getCardLabel(card);
      var labelWasReal = cardLabel === 'yes';
      var correctChoice = labelWasReal == playerVotedReal;
      updateAccuracy(correctChoice);


      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }

  });
});

function createButtonListener(real) {
  return function (event) {

    var cards = document.querySelectorAll('.card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];
    var cardLabel = getCardLabel(card);
    var labelWasReal = cardLabel === 'yes';
    var correctChoice = labelWasReal == real;

    updateAccuracy(correctChoice);

    card.classList.add('removed');

    if (real) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var onionListener = createButtonListener(false);
var realListener = createButtonListener(true);

onion.addEventListener('click', onionListener);
real.addEventListener('click', realListener);

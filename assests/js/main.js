var config = {
  apiKey: "AIzaSyAhflHnnanYXXB1DXrgNf8a0UojStFhjlA",
  authDomain: "rock-papper-scissors-37aff.firebaseapp.com",
  databaseURL: "https://rock-papper-scissors-37aff.firebaseio.com",
  projectId: "rock-papper-scissors-37aff",
  storageBucket: "rock-papper-scissors-37aff.appspot.com",
  messagingSenderId: "682542883310"
};
firebase.initializeApp(config);
var database = firebase.database();
var player1 = null, player2 = null, score1 = 0, score2 = 0, rounds = 0, tie = 0;

window.onload = function () {
  $('#set-1').hide();
  $('#set-2').hide();
  $('#tie').hide();
  $('#reset').hide();
  $('#player1-win').hide();
  $('#player2-win').hide();

  database.ref().on("value", function (snapshot) {
    rounds = snapshot.val().rounds;
    score1 = snapshot.val().player1Score;
    score2 = snapshot.val().player2Score;
    tie = snapshot.val().tie;
    $('#player-1-score').text(score1);
    $('#player-2-score').text(score2);
    $('#rounds').text(rounds);
    $('#ties').text(tie);
  });
}

function validate() {
  rounds++;
  if (player1 === "paper-1" && player2 === "paper-2" || player1 === "rock-1" && player2 === "rock-2" || player1 === "scissors-1" && player2 === "scissors-2") {
    tie++;
    $('#ties').text(tie);
    $('#tie').show();
  }
  if (player1 === "paper-1" && player2 === "rock-2") {
    score1++;
    $('#player-1-score').text(score1);
    $('#player1-win').show();
  } else if (player1 === "rock-1" && player2 === "paper-2") {
    score2++;
    $('#player-2-score').text(score2);
    $('#player2-win').show();
  }
  if (player1 === "rock-1" && player2 === "scissors-2") {
    score1++;
    $('#player-1-score').text(score1);
    $('#player1-win').show();
  } else if (player1 === "scissors-1" && player2 === "rock-2") {
    score2++;
    $('#player-2-score').text(score2);
    $('#player2-win').show();
  }
  if (player1 === "scissors-1" && player2 === "paper-2") {
    score1++;
    $('#player-1-score').text(score1);
    $('#player1-win').show();
  } else if (player1 === "paper-1" && player2 === "scissors-2") {
    score2++;
    $('#player-2-score').text(score2);
    $('#player2-win').show();
  }

  database.ref().set({
    player1Score: score1,
    player2Score: score2,
    rounds: rounds,
    tie: tie
  });

  $('#reset').show();
}




$(document).on('click', 'img', function () {
  var image = $(this).attr('data-value');
  console.log(image);
  if (image === "paper-1" || image === "rock-1" || image === "scissors-1") {
    $('#set-1').hide();
    player1 = image;
  } else {
    $('#set-2').hide();
    player2 = image;
  }
  if (player1 != null && player2 != null) {
    validate();
  }
});

$('#player-1').on('click', function () {
  $(this).addClass('disabled');
  $(this).addClass('btn-secondary');
  $(this).removeClass('btn-outline-info');
  $('#set-1').show();
});

$('#player-2').on('click', function () {
  $('#player-2').addClass('disabled');
  $(this).addClass('btn-secondary');
  $(this).removeClass('btn-outline-info');
  $('#set-2').show();
});

$('#reset').on('click', function () {
  $('#set-1').hide();
  $('#set-2').hide();
  $('#reset').hide();
  $('#tie').hide();
  $('#player2-win').hide();
  $('#player1-win').hide();
  $('#player-1').removeClass('btn-secondary');
  $('#player-1').removeClass('disabled');
  $('#player-1').addClass('btn-outline-info');
  $('#player-2').removeClass('btn-secondary');
  $('#player-2').removeClass('disabled');
  $('#player-2').addClass('btn-outline-info');
});
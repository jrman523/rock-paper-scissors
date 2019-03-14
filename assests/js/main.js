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
var player1 = "null", player2 = "null", score1 = 0, score2 = 0, rounds = 0, tie = 0;
var IsOpen1 = false, IsOpen2 = false, picked1 = false, picked2 = false;

window.onload = function () {
  $('#set-1').hide();
  $('#set-2').hide();
  $('#tie').hide();
  $('#reset').hide();
  $('#player1-win').hide();
  $('#player2-win').hide();
  connection();
};

function validate() {
  database.ref().on("value", function (snapshot) {
    player1 = snapshot.val().connect.player1;
    player2 = snapshot.val().connect.player2;

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

    database.ref('score').set({
      player1Score: score1,
      player2Score: score2,
      rounds: rounds,
      tie: tie
    });

    $('#reset').show();
  });
}

database.ref().on("value", function (snapshot) {
  rounds = snapshot.val().score.rounds;
  score1 = snapshot.val().score.player1Score;
  score2 = snapshot.val().score.player2Score;
  tie = snapshot.val().score.tie;
  $('#player-1-score').text(score1);
  $('#player-2-score').text(score2);
  $('#rounds').text(rounds);
  $('#ties').text(tie);
});


$(document).on('click', 'img', function () {
  var image = $(this).attr('data-value');
  if (image === "paper-1" || image === "rock-1" || image === "scissors-1") {
    player1 = image;
    IsOpen1 = false;
    picked1 = true;
    set();
    connection();
  } else {
    player2 = image;
    IsOpen2 = false;
    picked2 = true;
    set();
    connection();
  }
  if (player1 != "null" && player2 != "null") {
    validate();
  }
});

function connection() {

  database.ref().on("value", function (snapshot) {
    IsOpen1 = snapshot.val().connect.IsOpen1;
    IsOpen2 = snapshot.val().connect.IsOpen2;
    picked1 = snapshot.val().connect.picked1;
    picked2 = snapshot.val().connect.picked2;
    player1 = snapshot.val().connect.player1;
    player2 = snapshot.val().connect.player2;

    if (IsOpen1 === true && IsOpen2 === false) {
      $('#player-1').addClass('disabled');
      $('#player-1').addClass('btn-secondary');
      $('#player-1').removeClass('btn-outline-info');
      $('#set-1').show();
      $('#player-2').removeClass('btn-outline-info');
      $('#player-2').removeClass('btn');
      $('#player-2').addClass('picking');

    } else if (IsOpen1 === false && IsOpen2 === true) {
      $('#player-2').addClass('disabled');
      $('#player-2').addClass('btn-secondary');
      $('#player-2').removeClass('btn-outline-info');
      $('#set-2').show();
      $('#player-1').removeClass('btn-outline-info');
      $('#player-1').removeClass('btn');
      $('#player-1').addClass('picking');
    }

    if (picked1 === true && picked2 === false) {
      $('#set-1').hide();
      $('#player-2').addClass('btn-outline-info');
      $('#player-2').addClass('btn');
      $('#player-2').removeClass('picking');
    } else if (picked1 === false && picked2 === true) {
      $('#set-2').hide();
      $('#player-1').addClass('btn-outline-info');
      $('#player-1').addClass('btn');
      $('#player-1').removeClass('picking');
    }
  });
}

function set() {
  database.ref('connect').set({
    IsOpen1: IsOpen1,
    IsOpen2: IsOpen2,
    picked1: picked1,
    picked2: picked2,
    player1: player1,
    player2: player2
  });
}

$(document).on('click', '.btn-outline-info', function () {
  var whoIsIt = $(this).attr('id');
  if (whoIsIt === "player-1") {
    IsOpen1 = true;
    set();
    connection();
  }

  if (whoIsIt === "player-2") {
    IsOpen2 = true;
    set();
    connection();
  }
});

function reset() {
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
  player1 = "null";
  player2 = "null";
  picked1 = false;
  picked2 = false;
  set();
}

$('#reset').on('click', function () {
  if (picked1 === true & picked2 === true) {
    reset();
  }
});
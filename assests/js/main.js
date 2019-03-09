var config = {
  apiKey: "AIzaSyAhflHnnanYXXB1DXrgNf8a0UojStFhjlA",
  authDomain: "rock-papper-scissors-37aff.firebaseapp.com",
  databaseURL: "https://rock-papper-scissors-37aff.firebaseio.com",
  projectId: "rock-papper-scissors-37aff",
  storageBucket: "rock-papper-scissors-37aff.appspot.com",
  messagingSenderId: "682542883310"
};
firebase.initializeApp(config);

window.onload = function () {
  $('#set-1').hide();
  $('#set-2').hide();
}

$(document).on('click', 'img', function () {
  var image = this.value;
  console.log(image);
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


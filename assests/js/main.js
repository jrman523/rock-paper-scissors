var config = {
    apiKey: "AIzaSyAhflHnnanYXXB1DXrgNf8a0UojStFhjlA",
    authDomain: "rock-papper-scissors-37aff.firebaseapp.com",
    databaseURL: "https://rock-papper-scissors-37aff.firebaseio.com",
    projectId: "rock-papper-scissors-37aff",
    storageBucket: "rock-papper-scissors-37aff.appspot.com",
    messagingSenderId: "682542883310"
  };
  firebase.initializeApp(config);



  $(document).on('click','#player-1', function(){
    $('#player-1').addClass('disabled');
    $('#player').text('player-1');
  });

  $(document).on('click','#player-2', function(){
    $('#player-2').addClass('disabled');
    $('#player').text('player-2');
  });
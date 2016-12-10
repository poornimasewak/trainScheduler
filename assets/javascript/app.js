  $(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAdCdgJG2nhfcY6Odse_oe4mO28PgfcgUI",
    authDomain: "trainscheduler-41e65.firebaseapp.com",
    databaseURL: "https://trainscheduler-41e65.firebaseio.com",
    storageBucket: "trainscheduler-41e65.appspot.com",
    messagingSenderId: "424228557052"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //variables to store values from user.
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;
  // var nextTrain;
  // var tMinutesTillTrain;
  var trains = [];

  // Grabbing input values entered by user when submit button is clicked.
  $('.form-horizontal').on('submit', function(){

      trainName = $('#input-train-name').val().trim();
      destination = $('#input-destination').val().trim();
      firstTrainTime = $('#first-train-time').val().trim();
      frequency = $('#input-frequency').val().trim();
    // console.log(moment(firstTrainTime, "HH:mm"));
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();

      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "years");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  	 database.ref().push({
			 trainName: trainName,
			 destination: destination,
			 firstTrainTime: firstTrainTime,
			 frequency: frequency,
       nextTrain: nextTrain,
       tMinutesTillTrain: tMinutesTillTrain
		});
     
     
     // render();

     
  	 return false;
  });



  database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        // trains.push(snapshot.val());
 $('#train-info').append('<tr><td>'+childSnapshot.val().trainName+
        '<td>'+childSnapshot.val().destination+'<td>'+childSnapshot.val().frequency+
        '<td>'+childSnapshot.val().nextTrain+'<td><input type="submit" value="X" class="remove-train btn btn-danger btn-sm">');
      // console.log(trains[i]+   i);

// render();
        
      });

  // function render() {

  //   for(var i = 0; i < trains.length; i++){
  //     // console.log(trains.length);
  //     $('#train-info').append('<tr><td>'+trains[i].trainName+
  //       '<td>'+trains[i].destination+'<td>'+trains[i].frequency+
  //       '<td>'+trains[i].nextTrain);
  //     console.log(trains[i]+   i);
  //   }
  // }
  
});
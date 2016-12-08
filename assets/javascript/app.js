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

  // Grabbing input values entered by user when submit button is clicked.
  $('.form-horizontal').on('submit', function(){
      trainName = $('#input-train-name').val().trim();
      destination = $('#input-destination').val().trim();
      firstTrainTime = $('#first-train-time').val().trim();

      frequency = $('#input-frequency').val().trim();
      console.log(trainName,destination,firstTrainTime,frequency);
      // console.log(moment(firstTrainTime).format("hh:mm"));
  
  	 database.ref().push({
			 trainName: trainName,
			 destination: destination,
			 firstTrainTime: firstTrainTime,
			 frequency: frequency
		});
     displayTrainInfo();
  	 return false;
  });

  // displaying data
  function displayTrainInfo(){

    // firstTrainTime = moment(firstTrainTime,"hh:mm");

     // Assumptions
      var tFrequency = 3;

      // Time is 3:30 AM
      var firstTime = "03:30";

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();

      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "years");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


  	$('#train-info').append('<tr><th>'+trainName+'<th>'+destination+'<th>'+frequency+'<th>'+moment(nextTrain).format("HH:mm")+'<th>'+tMinutesTillTrain);
  	
  }

  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
  });
  
});
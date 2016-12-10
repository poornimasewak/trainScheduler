  $(document).ready(function() {

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
      var trainName = '';
      var destination = '';
      var firstTrainTime = '';
      var frequency = '';
      var trains = [];

      // Grabbing input values entered by user when submit button is clicked.
      $('.form-horizontal').on('submit', function() {

          trainName = $('#input-train-name').val().trim();
          destination = $('#input-destination').val().trim();
          firstTrainTime = $("#first-train-time").val().trim();
          frequency = $('#input-frequency').val().trim();

          //creating object to store data from user
          var trainData = {
              trainName: trainName,
              destination: destination,
              firstTrainTime: firstTrainTime,
              frequency: frequency,
          }

          //pushing data object to firebase
          database.ref().push(trainData);

          return false;
      });


      //getting data back from firebase to display on web page
      database.ref().on("child_added", function(childSnapshot) {

          var fTrainTime = childSnapshot.val().firstTrainTime;


          var tFrequency = childSnapshot.val().frequency;

          // Current Time
          // var currentTime = moment();
          // console.log('current time : '+moment(currentTime).format("HH:mm"));

          // Difference between the times
          var diffTime = moment().diff(moment.unix(fTrainTime), "minutes");

          // Time apart (remainder)
          var tRemainder = diffTime % tFrequency;

          // Minute Until Train
          var tMinutesTillTrain = tFrequency - tRemainder;

          // Next Train
          var nextTrain = moment().add(tMinutesTillTrain, "minutes");


          $('#train-info').append('<tr><td>' + childSnapshot.val().trainName +
              '<td>' + childSnapshot.val().destination + '<td>' + childSnapshot.val().frequency +
              '<td>' + moment(nextTrain).format("HH:mm") + '<td>' + tMinutesTillTrain + '<td><input type="submit" value="X" class="remove-train btn btn-danger btn-sm">');

      });

      //removing train data from the web page once user click on remove button
      $("body").on("click", ".remove-train", function() {
          $(this).closest('tr').remove();
          var getKey = $(this).parent().parent().attr('id');
          database.ref().child(getKey).remove();
      });
  });
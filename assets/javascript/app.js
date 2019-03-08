//----- Initialize FireBase ----------
var config = {
    apiKey: "AIzaSyDfIklCNOgwpBawLdx-vV6WetB71I1fdro",
    authDomain: "learning-firebase-uoft-cbc.firebaseapp.com",
    databaseURL: "https://learning-firebase-uoft-cbc.firebaseio.com",
    projectId: "learning-firebase-uoft-cbc",
    storageBucket: "learning-firebase-uoft-cbc.appspot.com",
    messagingSenderId: "775609919080"
  };
  firebase.initializeApp(config)

  // Create a variable to reference the database
  var database = firebase.database();

  // Initial Variables
//   var inputName;
//   var inputDestination;
//   var inputTime;
//   var inputFrequency;
  // Declare variables to store snapshot values
  var outputName;
  var outputDestination;
  var outputTime;
  var outputFrequency;

  //----- Add Train Form ------
  //when submit button is clicked, the following code will occur
  $("#submit").on("click", function(){

    // inputs are stored in the variables declared above
    var inputName=$("#trainName").val().trim();
    var inputDestination=$("#trainDest").val().trim();
    var inputTime=$("#trainTime").val().trim();
    var inputFrequency=$("#trainFreq").val().trim();

var addTrain={
    Name: inputName,
    destination: inputDestination,
    time: inputTime,
    frequency: inputFrequency
}
database.ref().push(addTrain);
});

  database.ref().on("child_added", function(childSnapshot){
    outputName=childSnapshot.val().Name;
    outputDestination=childSnapshot.val().destination;
    outputTime=childSnapshot.val().time;
    outputFrequency=childSnapshot.val().frequency;
 
//   console.log(outputName);
//   console.log(outputDestination);
  console.log(outputTime);
//   console.log(outputFrequency);

  //----- Moment.js -------
  // Use moment.js to convert arrival time and wait time

  // convert user-entered arrival time (military time), into 
  var time = moment(outputTime, "HH:mm").subtract(1, "years");
  //console.log("time: "+time);

  var diffTime = moment().diff(moment(time), "minutes");
  //console.log("time diff " +diffTime);

  var timeRemaining = diffTime % outputFrequency;
  //console.log("time remaining: "+timeRemaining);

  var waitTime = outputFrequency - timeRemaining;
  //console.log("waitTime " +waitTime);

  var nextTrain = moment().add(waitTime, "minutes").format("HH:mm");
  //console.log("nextTrain"+ nextTrain);

  var newRow =document.createElement("tbody");

  var name = document.createElement("td");
  name.innerHTML=outputName;
  newRow.appendChild(name);

  var destination =document.createElement("td");
  destination.innerHTML=outputDestination;
  newRow.appendChild(destination);

  var frequency=document.createElement("td");
  frequency.innerHTML=outputFrequency;
  newRow.appendChild(frequency);

  var dispTime =document.createElement("td");
  dispTime.innerHTML=nextTrain;
  newRow.appendChild(dispTime);

  var wait = document.createElement("td");
  wait.innerHTML=waitTime;
  newRow.appendChild(wait);
  
  
  var table = document.getElementById("enteredTrains");
  table.appendChild(newRow);
});


  









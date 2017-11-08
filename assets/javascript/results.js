// // Initialize Firebase
// var config = {
// 	apiKey: "AIzaSyAllfQG9oAzeZk-W_f3aW_f3dYw6Axq4gk",
// 	authDomain: "project-1-8e126.firebaseapp.com",
// 	databaseURL: "https://project-1-8e126.firebaseio.com",
// 	projectId: "project-1-8e126",
// 	storageBucket: "",
// 	messagingSenderId: "704064336079"
// };
// firebase.initializeApp(config);


// // GLOBAL VARIABLES
// // ====================================================================================
// var database = firebase.database();
// var userName = "";
// var userCompany = "";
// var userDressCode = "";
// var userIndustry = "";
// var userOutfit = "";


// // FUNCTIONS
// // ====================================================================================
// // function to render new row on DOM from firebase
// function displayNewRow(snapshotObject) {

// 	// dynamically create a virtual table row
// 	var newRow = $("<tr>");

// 	// for each item in the array
// 	for (var i = 0; i < userArray.length; i++) {

// 		// append its table data to the virtual row
// 		newRow.append("<td>" + userArray[i] + "</td>");
// 	}

// 	// append the row to the DOM
// 	$("tbody").append(newRow);

// }

// // function to initialize page with existing data in firebase
// function initPage(snapshotObject) {

// 	// if there is data stored in database when page loads
// 	if (snapshotObject.numChildren() >= 1) {

// 		// for each object
// 		snapshotObject.forEach(function(childSnapshot) {

// 			// make an array for the value of each property in the object
// 			var userArray = [childSnapshot.child("name").val(), childSnapshot.child("company").val(), childSnapshot.child("dressCode").val(), childSnapshot.child("industry").val()];
// 			//childSnapshot.child("outfitResult").val()

// 			// display to page (append to table)
// 			displayNewRow(userArray);

// 		});

// 	} else { 
// 		return;
// 	}

// }


// // MAIN PROCESS
// // ====================================================================================
// // when page loads
// database.ref().once("value", function(snapshot) {

// 	// initialize table
// 	initPage(snapshot);

// // error handling
// }, function(err) {
// 	console.error(err);
// });

// // when new object is pushed to firebase
// database.ref().on("child_added", function(snapshot) {

// 	// create new row on DOM from all user input
// 	displayNewRow(snapshot);

// // error handling
// }, function(err) {
// 	console.error(err);
// });
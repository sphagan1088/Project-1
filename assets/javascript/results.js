// Initialize Firebase
var config = {
	apiKey: "AIzaSyAllfQG9oAzeZk-W_f3aW_f3dYw6Axq4gk",
	authDomain: "project-1-8e126.firebaseapp.com",
	databaseURL: "https://project-1-8e126.firebaseio.com",
	projectId: "project-1-8e126",
	storageBucket: "",
	messagingSenderId: "704064336079"
};
firebase.initializeApp(config);


// GLOBAL VARIABLES
// ====================================================================================
var database = firebase.database();
// var imgDiv = $("#outfit-img");


// FUNCTIONS
// ====================================================================================
// function displayImg(snapshot) {
// 	imgDiv.append(snapshot.val().outfit);
// }

function initPage(snapshotObject) {

	// if there are train times stored in database when page loads
	if (snapshotObject.numChildren() >= 1) {

		// for each train object
		snapshotObject.forEach(function(childSnapshot) {

			// make an array for the value of each property in the object
			var userArray = [childSnapshot.child("name").val(), childSnapshot.child("company").val(), childSnapshot.child("dressCode").val(), childSnapshot.child("industry").val()];
			//childSnapshot.child("outfitResult").val()

			// display to page (append to table)
			displayNewRow(userArray);

		});

	} else { 
		return;
	}

}

function displayNewRow(snapshotObject) {
	
    var newRow = $("<tr>");

    newRow.append("<td>" + snapshotObject.val().name + "</td>");
    newRow.append("<td>" + snapshotObject.val().company + "</td>");
    newRow.append("<td>" + snapshotObject.val().dressCode + "</td>");
    newRow.append("<td>" + snapshotObject.val().industry + "</td>");
    // newRow.append("<td>" + snapshotObject.val().outfitResult + "</td>");

    $("tbody").append(newRow);

}


// MAIN PROCESS
// ====================================================================================
database.ref().once("value", function(snapshot) {

	// initialize table
	initPage(snapshot);

// error handling
}, function(err) {
	console.error(err);
});

database.ref().on("child_added", function(snapshot) {
	displayNewRow(snapshot);
	// displayImg();
}, function(err) {
	console.error(err);
});


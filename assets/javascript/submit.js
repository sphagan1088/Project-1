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
var userName = "";
var userCompany = "";
var userDressCode = "";
var userIndustry = "";
var userOutfit = "";


// FUNCTIONS
// ====================================================================================
// function to render new row on DOM from firebase
function displayNewRow(array) {

	// dynamically create a virtual table row
	var newRow = $("<tr class='new-row'>");

	// for each item in the array
	for (var i = 0; i < array.length; i++) {

		// append its table data to the virtual row
		newRow.append("<td>" + array[i] + "</td>");
	}

	// append the row to the DOM
	$("tbody").prepend(newRow);

}

// function to initialize page with existing data in firebase
function initPage(snapshotObject) {

	// if there is data stored in database when page loads
	if (snapshotObject.numChildren() >= 1) {

		// for each object
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

// function for when user submits form
function submit() {

	// capture all user input
	userName = $("#name").val();
	userCompany = $("#company").val();
	userDressCode = $("#dress-code").val();
	userIndustry = $("#industry").val();
	userOutfit = $("#outfit").val();

	// create object to push to firebase
	var pushObject = {
		name: userName,
		company: userCompany,
		dressCode: userDressCode,
		industry: userIndustry,
		outfit: userOutfit,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	}

	// create array from inputs to be used by displayNewRow function
	var userArray = [userName, userCompany, userDressCode, userIndustry];
	// userResult

	// display each input value from userArray as a new row on DOM
	displayNewRow(userArray);

	// capture push function so that myKey returns the key of the specific object pushed
	var myKey = database.ref().push(pushObject);

	// do vize api call here

	// redirect to results page & when api call is done append file parameters to URL
	// window.location = "results.html?id=" + myKey.key + "&dressType=" + resultFromVize;

}

// function for hiding rows once data storage gets past 5 people
function hideRows() {

	$(".new-row").slice(5).css("display", "none");

}


// MAIN PROCESS
// ====================================================================================
$(window).on("load", function() {

	// flash user's new row on results page
    $(".new-row:first-child").addClass("flash");

})

// when page loads
database.ref().once("value", function(snapshot) {

	// console insight
	console.log(snapshot.val());

	// initialize table
	initPage(snapshot);

	// hide rows past row 5
	hideRows();

// error handling
}, function(err) {
	console.error(err);
});

// whenever a new object is pushed to firebase
database.ref().on("child_added", function(snapshot) {

	// console insight
	console.log(snapshot.val());

// error handling
}, function(err) {
	console.error(err);
});

// when user clicks submit, execute submit function
$("#submit").on("click", function(e) {

	e.preventDefault();

	submit();

});


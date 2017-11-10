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
            var userArray = [childSnapshot.child("name").val(), childSnapshot.child("company").val(), childSnapshot.child("dressCode").val(), childSnapshot.child("industry").val(), childSnapshot.child("outfitResult").val()];
            //childSnapshot.child("outfitResult").val()

            // display to page (append to table)
            displayNewRow(userArray);

        });

    } else {
        return;
    }

}

// function to display appropriate results to DOM
function displayCorrectResults(snapshotObject) {

	var snapshotResult = snapshotObject.val().outfitResult;

	// display correct outfit result
	$("#outfit-result").html(snapshotResult);

	// display google maps for if result is casual
	displayGoogleMaps(snapshotResult);

	// display correct modal button icon
	displayModalBtnIcon(snapshotResult);

	// display correct modal message
	displayModalMessage(snapshotResult);

}

// function to display user img to DOM
function displayImg(snapshotObject) {
	var snapshotImg = snapshotObject.val().imgb64;
	$("#outfit-preview").attr("src", snapshotImg);
}

// function to display google maps if result is casual
function displayGoogleMaps(result) {

	if (result === "Casual") {
		$("#google-maps").show();
	}
	else if (result === "Formal") {
		$("#google-maps").hide();
	}

}

// function to display sad face or happy face in modal button based on result
function displayModalBtnIcon(result) {

	if (result === "Formal") {
		$("#happy-face").show();
		$("#sad-face").hide();
	}
	else if (result === "Casual") {
		$("#sad-face").show();
		$("#happy-face").hide();
	}

}

// function to display appropriate modal message based on result
function displayModalMessage(result) {

	if (result === "Formal") {
		$("#formal-message").show();
		$("#casual-message").hide();
	}
	else if (result === "Casual") {
		$("#casual-message").show();
		$("#formal-message").hide();
	}

}

// function for hiding rows once data storage gets past 5 people
function hideRows() {
    $(".new-row").slice(5).css("display", "none");
}


// MAIN PROCESS
// ====================================================================================
// when page loads
database.ref().once("value", function(snapshot) {

    // initialize table
    initPage(snapshot);

    // flash user's new row on results page
    $(".new-row:first-child").addClass("flash");

    // hide rows past row 5
    hideRows();

    // error handling
}, function(err) {
    console.error(err);
});

// whenever a new object is pushed to firebase
database.ref().on("child_added", function(snapshot) {

    // display outfit result
    displayCorrectResults(snapshot);

    // display user outfit img
    displayImg(snapshot);

    // flash user's new row on results page
    $(".new-row:first-child").addClass("flash");

    // error handling
}, function(err) {
    console.error(err);
});

// only console out most recent object from firebase
firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // console insight
    console.log(snapshot.val());
});
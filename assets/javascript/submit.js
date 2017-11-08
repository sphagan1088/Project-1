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
function submit(e) {
	e.preventDefault();
	userName = $("#name").val();
	userCompany = $("#company").val();
	userDressCode = $("#dress-code").val();
	userIndustry = $("#industry").val();
	userOutfit = $("#outfit").val();

	var pushObject = {
		name: userName,
		company: userCompany,
		dressCode: userDressCode,
		industry: userIndustry,
		outfit: userOutfit,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	}

	var myKey = database.ref().push(pushObject);
	//do api call here
	//when its done append some file params here
	window.location = "formal.html?id="+myKey.key+ "&dressType=" + resultFromVise;
}


// MAIN PROCESS
// ====================================================================================
database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());
}, function(err) {
	console.error(err);
});

$("#submit").on("click", submit);


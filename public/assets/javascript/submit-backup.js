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

// //console.log(JSON.stringify(image));
// $('#file-input').change(function(event) {
//   	console.log(event.target.files);
//     var tmppath = URL.createObjectURL(event.target.files[0]);
//     console.log(tmppath);
// });

function requestVizeAPI() {

	// if all fields are not filled out
	 userName = $("#name").val();
				    userCompany = $("#company").val();
				    userDressCode = $("#dress-code").val();
				    userIndustry = $("#industry").val();
				    userOutfit = $("#outfit").val();
	if (userName === "" ||
		userCompany === "" ||
		userDressCode === "" ||
		userIndustry === "" ||
		userOutfit === "") {
		debugger;
		console.log("problemo")
		// trigger modal
        $('#submit').addClass("modal-trigger");
    }
    else {
    	$("#submit").removeClass("modal-trigger");
	    $("#loading").show();
	    $("#main").hide();
	    var selectedFile = document.getElementById('file-input').files[0];
	    var path = URL.createObjectURL(selectedFile);
	    var fr = new FileReader();
	    fr.onload = function(e) {
	        console.log("LOADED");
	        $("#preview").attr("src", e.target.result);
	        // capture push function so that myKey returns the key of the specific object pushed
	        console.log('http://cl-api.vize.ai/3313?image=' + $("#preview").attr("src"));

	        var image = new FormData();
	        image.append("image", selectedFile);

	        axios.post('/api/vize-api', image, {
	        		headers: { 'Content-Type': 'multipart/form-data' }

	        	})
	            .then(function(response) {
	                console.log(response);
	                console.log(response.data.prediction);

	                // capture all user input to push to firebase
				    userName = $("#name").val();
				    userCompany = $("#company").val();
				    userDressCode = $("#dress-code").val();
				    userIndustry = $("#industry").val();
				    userResult = response.data.prediction;

				    // create array from inputs to be used by displayNewRow function
				    var userArray = [userName, userCompany, userDressCode, userIndustry, userResult];

			        // create object to push to firebase
			        var pushObject = {
			            name: userName,
			            company: userCompany,
			            dressCode: userDressCode,
			            industry: userIndustry,
			            outfitResult: userResult,
			            imgb64: e.target.result,
			            timestamp: firebase.database.ServerValue.TIMESTAMP
			        }
			        var myKey = database.ref().push(pushObject);

	                // redirect to results page & when api call is done append file parameters to URL
	                window.location = "results.html?id=" + myKey.key + "&dressType=" + response.data.prediction;

	            })
	            .catch(function(error) {
	                console.log(error);
	            });
	    }
	    fr.readAsDataURL(selectedFile)
	    // fr.error(function(err) {

	    // })
	}
};


// MAIN PROCESS
// ====================================================================================
// when user clicks submit, execute submit function
$("#submit").on("click", function(e) {

    e.preventDefault();

    requestVizeAPI();

});
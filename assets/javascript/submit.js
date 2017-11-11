// Initialize Firebase
var config = {
	apiKey: "AIzaSyAllfQG9oAzeZk-W_f3aW_f3dYw6Axq4gk",
	authDomain: "project-1-8e126.firebaseapp.com",
	databaseURL: "https://project-1-8e126.firebaseio.com",
	projectId: "project-1-8e126",
	storageBucket: "project-1-8e126.appspot.com",
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

// console.log(JSON.stringify(image));
// $('#file-input').change(function(event) {
//   	console.log(event.target.files);
//     var tmppath = URL.createObjectURL(event.target.files[0]);
//     console.log(tmppath);
// });

function requestVizeAPI() {

	// capture all user input
 	userName = $("#name").val();
    userCompany = $("#company").val();
    userDressCode = $("#dress-code").val();
    userIndustry = $("#industry").val();
    userOutfit = $("#outfit").val();

    // if all fields are not filled out
	if (userName === "" ||
		userCompany === "" ||
		userDressCode === null ||
		userIndustry === "" ||
		userOutfit === "") {
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
		fr.onload = function (e) {
			console.log("LOADED");
			// $("#preview").attr("src", e.target.result);
			// console.log('http://cl-api.vize.ai/3313?image=' + $("#preview").attr("src"));


			var image = new FormData();
			image.append("image", selectedFile);


			axios.post('http://cl-api.vize.ai/3313', image,

				{
					"headers": {
						"Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjMxODQsImlhdCI6MTUxMDEwNjQ2MiwiZXhwIjoxNTE3ODgyNDYyfQ.w4vK7xPw-Fff7vWbKGFe1AqB-2Od-lCnsR8KHU3bVow",
					}
				}
			)
	            .then(function(response) {
	                console.log(response);
	                console.log(response.data.prediction);

	                // capture all user input to push to firebase
				    userName = $("#name").val();
				    userCompany = $("#company").val();
				    userDressCode = $("#dress-code").val();
				    userIndustry = $("#industry").val();
				    userResult = response.data.prediction;

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

					// capture push function so that myKey returns the key of the specific object pushed
			        var myKey = database.ref().push(pushObject);

	                // redirect to results page & when api call is done append file parameters to URL
	                window.location = "./results.html?id=" + myKey.key + "&dressType=" + response.data.prediction;

	            })
	            .catch(function(error) {
	                console.log(error);
	            });
	    }
	    fr.readAsDataURL(selectedFile);
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

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
var userImage = "";
var userCompany = "";
var userIndustry = "";


// FUNCTIONS
// ====================================================================================
// on click for submit button
	// capture user values
	// link to next page

// HTTP request to Vize
	// query with user image
	// display results to page

// HTTP request to Amazon
	// query with professional clothing
	// display to page

// display firebase data to table


// MAIN PROCESS
// ====================================================================================
//console.log(JSON.stringify(image));
$('#file-input').change( function(event) {
  	console.log(event.target.files);
    var tmppath = URL.createObjectURL(event.target.files[0]);
    console.log(tmppath);
});

$("#submit").on("click", function(e) {
    e.preventDefault();
    var selectedFile = document.getElementById('file-input').files[0];
    var path = URL.createObjectURL(selectedFile);
    var fr = new FileReader();
    fr.onload = function(e) {
      	console.log("LOADED")
      	$("#preview").attr("src", e.target.result);
      	console.log('http://cl-api.vize.ai/3313?image='+$("#preview").attr("src"))


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
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    fr.readAsDataURL(selectedFile)
    // fr.error(function(err) {

    // })
     
})



// var fs = require("fs");
// var unirest = require("unirest");

// var req = unirest("POST", "http://cl-api.vize.ai/3226");

// req.headers({
//   "postman-token": "171a1e2f-5edb-c07b-a8d1-e4eb4353ae01",
//   "cache-control": "no-cache",
//   "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//   "accept": "text/plain",
//   "authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjMxMTEsImlhdCI6MTUwOTY3MTk0NSwiZXhwIjoxNTE3NDQ3OTQ1fQ.129m04WJfU5UazJxPHFw-1HiC7yUQtnfMbv3BWleHGY"
// });

// req.multipart([
//   {
//     "body": fs.createReadStream("C:\\Users\\sphag\\Desktop\\Project\\Winter\\1.jpg")
//   }
// ]);

// req.end(function (res) {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body);
// });
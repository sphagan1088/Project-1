
 //console.log(JSON.stringify(image));
 $('#file-input').change( function(event) {
  console.log(event.target.files);
    var tmppath = URL.createObjectURL(event.target.files[0]);
    console.log(tmppath)
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



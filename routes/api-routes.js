const axios = require('axios');
const express = require('express');
const router = express.Router();

// route: /api
router.post('/vize-api', function (req, res) {
	console.log(req.body);
	const image = req.body.image;
	axios.post('http://cl-api.vize.ai/3313', image,

	    {
	        "headers": {
	            "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjMxODQsImlhdCI6MTUxMDEwNjQ2MiwiZXhwIjoxNTE3ODgyNDYyfQ.w4vK7xPw-Fff7vWbKGFe1AqB-2Od-lCnsR8KHU3bVow",
	        }
	    }
	)
	.then(function(response) {
	    console.log(response);
	  res.send(response);
	})
});
module.exports = router;
const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js')
const fs 		= require('fs');
const multer 	= require('multer');



// CREATE or REGISTER new listing 
router.post('/', async (req,res,next) => {
	console.log('hit the create listing route!!!');
	// https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
	// https://www.npmjs.com/package/multer
	// https://scotch.io/tutorials/express-file-uploads-with-multer
})





module.exports = router;
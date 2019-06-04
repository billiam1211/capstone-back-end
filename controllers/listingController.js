const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js')
const fs 		= require('fs');
const multer 	= require('multer');
const formidableMiddleware = require('express-formidable');


// CREATE or REGISTER new listing 
router.post('/new', async  (req,res,next) => {
	console.log('hit the create listing route!!!');
	res.send("Image sent successfully")
	// req.files is where all the information about the photo 
	// that we are trying to upload is being stored
	console.log("");
	console.log("");
	console.log("req.files.image.name: ", req.files.image.name);
	// find the current user that is logged in to catpure their id
    // const foundUser = await User.findById(req.session.userDbId);
    // console.log(foundUser, '<-- <-- <-- <-- found user is the user that is currently logged in');
    // set up the listing entry based on the req.body and the logged in user's id


	// const listingEntry = {};
 	// listingEntry.name 		= req.body.name;
	// listingEntry.category 	= req.body.category;
	// listingEntry.price 		= req.body.price;
	// listingEntry.quantity 	= req.body.quantity;
	// listingEntry.sellerId	= foundUser.userDbId


    // MULTER SECTION BELOW
    // listingEntry.image 		= []// get multi-part form data into React State



    // foundUser.photos.push(createdListing);
    // foundUser.save((err, savedUser) => {
    // 	message: 'listing created'
    // 	console.log(savedUser);
    // })

	try { 

		// const createdListing = await Listing.create(listingEntry)

	}catch(err){
		next(err)
	}




})






module.exports = router;
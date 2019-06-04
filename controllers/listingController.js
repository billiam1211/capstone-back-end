const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const session 	= require('express-session');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js')
const fs 		= require('fs');
const multer 	= require('multer');
// const formidableMiddleware = require('express-formidable');

// This sets up photo storage for Multer
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './client/uploads')
    },
    filename: function(req,file, cb){
        cb(null, file.fieldname+'-'+Date.now())
    }
})
const upload = multer({storage: storage})




// CREATE LISTING ROUTE
router.post('/new', upload.single('img'), async (req,res,next) => {
	try{

        const img = await fs.readFileSync(req.file.path);

        const finalImg = {
            contentType: req.file.mimeType,
            data: img
        };

		const listingEntry = {};
		listingEntry.name 		= req.body.name;
		listingEntry.category 	= req.body.category;
		listingEntry.price 		= req.body.price;
		listingEntry.quantity 	= req.body.quantity;
		listingEntry.sellerId	= req.session.userId 
		listingEntry.image 		= finalImg


	    // push the listing we just created into the listings array of the foundUser
    	const foundUser = User.findById(req.session.userId)
    	// console.log('here is the found user ', foundUser);


		const createdListing = await Listing.create(listingEntry)

	    foundUser.listings.push(createdListing);
	    foundUser.save((err, savedUser) => {
	    	message: 'listing created'
	    })

        res.json({
            status: 200,
            data: "File uploaded successfully"
        })

	}catch(err){
	console.log(err);
	}
})






module.exports = router;
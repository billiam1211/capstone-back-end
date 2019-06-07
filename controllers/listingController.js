const express 	= require('express');
const router 	= express.Router();
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js')
const bcrypt 	= require('bcryptjs');
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



  ///++++++++++++++++///
///+++++  ROUTES +++++///
 ///++++++++++++++///
router.get('/new', async (req,res,next) => {
	console.log('=========================');
	console.log(req.session, 'GET request session from /new');
	console.log('=========================');
	res.json({
		status: 200
	})
})

/////////////////////////
// CREATE LISTING ROUTE//
/////////////////////////
router.post('/new', upload.single('image'), async (req,res,next) => {

	try{
        const img = await fs.readFileSync(req.file.path);

        const finalImg = {
            contentType: req.file.mimeType,
            data: img
        };

        console.log(finalImg);

		const listingEntry = {};
		listingEntry.name 		 = req.body.name;
		listingEntry.category 	 = req.body.category;
		listingEntry.price 		 = req.body.price;
		listingEntry.description = req.body.description;
		listingEntry.quantity 	 = req.body.quantity;
		listingEntry.sellerId	 = req.session.userId 
		listingEntry.img		 = finalImg


		// Store the userId
		const loggedUserId = req.session.userId


	    // Push the listing we just created into the listings array of the foundUser
    	const foundUser = await User.findById(loggedUserId)
		const createdListing = await Listing.create(listingEntry)
	    await foundUser.listings.push(createdListing);
	    await foundUser.save()
	    console.log('======================');
	    console.log("foundUser: ", foundUser);
	    console.log('======================');

        res.json({
            status: 200,
            data: "File uploaded successfully"
        })


	}catch(err){
		next(err)
	}
})




/////////////////////////
// UPDATE LISTING ROUTE//
/////////////////////////
router.put('/:id', upload.single('image'), async (req,res,next) => {
	console.log('hit the listing update route');
	try{
        const img = await fs.readFileSync(req.file.path);
        const finalImg = {
            contentType: req.file.mimeType,
            data: img
        };
        console.log(finalImg);
		const listingEntry = {};
		listingEntry.name 		 = req.body.name;
		listingEntry.category 	 = req.body.category;
		listingEntry.price 		 = req.body.price;
		listingEntry.description = req.body.description;
		listingEntry.quantity 	 = req.body.quantity;
		listingEntry.sellerId	 = req.session.userId 
		listingEntry.img		 = finalImg


		// Store the userId
		const loggedUserId = req.session.userId


	    // Push the listing we just created into the listings array of the foundUser
		const listingToBeUpdated = await Listing.findByIdAndUpdate(req.params.id, listingEntry, {new: true})
		await listingToBeUpdated.save();
		res.json({
			status: 200, 
			data: listingToBeUpdated,
			msg: "Listing updated"
		})


	}catch(err){
		next(err)
	}
})



/////////////////
// INDEX ROUTE //
/////////////////
router.get('/index', async (req, res, next) => {
	console.log('hit the index route');
	try{
	    const foundListings = await Listing.find()
	    res.json({
	    	status: 200,
	    	data: foundListings,
	    	msg: "Search Complete"
	    })
	} catch(err){
		next(err)
	}
})




//////////////////////
// DELETE USER ROUTE//
//////////////////////
router.delete('/:id', async (req,res,next) => {
	console.log('hit the listing delete route');
	// need to add logic for security to make sure the logged in user
	// is the same as the foundUser
	try {

		const deleteListing = await Listing.findByIdAndRemove(req.params.id);
		res.json({
			status:200,
			data: "Deleted listing successfully"
		})

	} catch(err) {
		next(err)
	}
})


// //////////////////////////////
// /// GET LISTING PICS ROUTE ///
// //////////////////////////////

// router.get('/photo', async (req,res,next) => {
//     try{

//         const foundUser = await User.findById(req.session.userId);
//         console.log(foundUser.listings);

//         res.set('Content-Type', foundUser.listings.img.contentType)
//         res.send(foundUser.listings.img.data);


//     }catch(err){
//         next(err)
//     }
// })





module.exports = router;
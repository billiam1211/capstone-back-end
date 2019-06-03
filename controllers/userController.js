const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js');
const fs 		= require('fs');
const multer 	= require('multer');


// CREATE USER ROUTE
router.post('/register', async (req,res,next) => {
	console.log('hit the register route!!!');
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userDbEntry = {};
    userDbEntry.email = req.body.email;
    userDbEntry.password = passwordHash;
    try {
    	const createdUser = await User.create(userDbEntry)
    	req.session.logged = true;
    	req.session.userDbId = createdUser._id;
    	await createdUser.save();
    	res.json({
    		status: 200,
    		data: createdUser
    	})
    	console.log(createdUser);
    } catch(err) {
    	next(err)
    }
}) // END OF CREATE USER ROUTE





// USER SHOW ROUTE
router.get('/:id', async (req,res,next) => {
	console.log('Hit user show route');

	try{
		const foundUser = User.findById(req.params.id)
			.populate('listings')
			.exec((err, foundUser) => {
				console.log("foundUser => ", foundUser);
				res.json({
					status: 200,
					data: foundUser,
				})
			})
			console.log(foundUser);
	}catch(err){
		next(err)
	}
}) // END USER SHOW




// USER UPDATE ROUTE
router.put('/:id', async (req,res,next) => {
	console.log('Hit the user update route');

	// add logic to check whether the user is logged in and to
	// make sure that the logged in user matches the id other the 
	// user that needs to be updated

	try {
		const updatedUser = {
			email: req.body.email,
			password: req.body.password

		}
		console.log();
		const userToBeUpdated = await User.findByIdAndUpdate(req.params.id, updatedUser, {new: true})
		await userToBeUpdated.save();
		res.json({
			status: 200, 
			data: userToBeUpdated
		})
		console.log(userToBeUpdated);

	} catch(err) {
		next(err)
	}
}) // END OF USER UPDATE



module.exports = router;


// password: {
// 	type: String, 
// 	required: true
// }, 
// email: {
// 	type: String, 
// 	required: true, 
// 	unique: true
// },
// listings: [{
// 	type: mongoose.Schema.Types.ObjectId, 
// 	ref: 'Listing'
// }]
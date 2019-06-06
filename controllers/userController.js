const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const session 	= require('express-session');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js');
const fs 		= require('fs');
const multer 	= require('multer');


/////////////////////////
//// CREATE USER ROUTE///
/////////////////////////
router.post('/register', async (req,res,next) => {
	console.log('hit the register route!!!');


	if(req.body.password != req.body.confirmPassword){
		res.json({
			status: 200,
			msg: "Incorrect password"
		})
	} else{

		const password = req.body.password
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const userDbEntry = {};
	    userDbEntry.email = req.body.email;
	    userDbEntry.password = passwordHash;
	    userDbEntry.confirmPassword = req.body.confirmPassword
	    try {
	    	const createdUser = await User.create(userDbEntry)
	    	if(createdUser){
		    	req.session.logged = true;
		    	req.session.userId = createdUser._id;
                req.session.email 	= req.body.email;
		    	await createdUser.save();
		    	res.json({
		    		status: 200,
		    		data: createdUser,
		    		msg: "Account Created!"
		    	})
		    	console.log(createdUser);
	    	}
	    } catch(err) {
	    	next(err)
	    }
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
					data: foundUser
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
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
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




// DELETE USER ROUTE
router.delete('/:id', async (req,res,next) => {
	console.log('hit the user delete route');
	// need to add logic for security to make sure the logged in user
	// is the same as the foundUser
	try {
		const foundUser = await User.findById(req.params.id)
		console.log(foundUser, '<-- User to be deleted');
		const deleteUser = await User.findByIdAndRemove(req.params.id);
		res.json({
			status:200,
			data: foundUser
		})
	} catch(err) {
		next(err)
	}
})



module.exports = router;
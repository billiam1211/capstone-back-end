const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const User 		= require('../models/user.js');
const Listing 	= require('../models/listing.js');
const fs 		= require('fs');
const multer 	= require('multer');


// CREATE new user
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
}) // END OF CREATE/REGISTER USER ROUTE






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
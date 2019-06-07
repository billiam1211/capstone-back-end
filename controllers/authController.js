const User      = require('../models/user.js');
const Listing   = require('../models/listing.js')
const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const dotenv        = require('dotenv').config()



// User Login Route
router.post('/login', async (req,res,next) => {
	console.log('Front and back end are connected');
    try {
        const foundUser = await User.findOne({
            email: req.body.email,
        });
        console.log("foundUser: ", foundUser);
        if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.email 	= req.body.email;
                req.session.userId 	= foundUser._id;
                req.session.logged 	= true;
                req.session.message = 'Login Succesful!';
                res.json({
                    status: 200,
                    data: foundUser,
                    msg: req.session.message
                })
                console.log(req.session, '<==<< Here is req.session');
            } else {
                req.session.message = "Username or password is incorrect";
                res.json({
                    status: 401,
                    msg: req.session.message
                })
            }
        } else {
            req.session.message = 'User not found, please create an account.';
            res.json({
                status: 200,
                msg: req.session.message
            })
        }
    } catch (err) {
        next(err);
    }
}) // End of user login






// User Logout Route
router.delete('/logout', async (req,res,next) => {
	console.log('hit the logout route');
	if(req.session){
	    try {
	      const deletedSession = await req.session.destroy((err) => {
    	      res.json({
    	      	status: 200,
    	      	data: 'You have successfully logged out.'
    	      })
	      })
        console.log(deletedSession);
	    } catch(err) {
	      next(err)
	    }
	  }
}) // End of user logout route








module.exports = router;

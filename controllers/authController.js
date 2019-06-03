const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


router.get('/login', async (req,res,next) => {
	console.log('hey, front and back end are connected');
})








module.exports = router;

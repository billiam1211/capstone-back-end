const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String, 
		required: true, 
		unique: true
	},
	password: {
		type: String, 
		required: true
	}, 
	listings: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Listing'
	}]

})

const User = mongoose.model('User', userSchema)

module.exports = User;





// Below is documentation on how to set up Geolocation in the schema
// https://stackoverflow.com/questions/28749471/mongoose-schema-for-geojson-coordinates
// https://mongoosejs.com/docs/geojson.html
// 	> location (zip code / city ???)


// 	> [Listings]



// 	> [Offers] // email or back up: notifications 
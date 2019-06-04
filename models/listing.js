const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({	
	name: {
		type: String, 
		required: false
	},
	category: {
		type: String,
		enum : ['apparel', 'decorations', 'ceremony', 'reception', 'favors', 'other'],
		default: 'other',
		required: false
	},
	price: {
		type: String, 
		required: false
	}, 
	quantity: {
		type: Number, 
		required: false,
		default: 1
	},
	description: {
		type: String,
		required: false
	},
	img: {
		data: Buffer,
		contentType: String
	},
	sellerId: {
		type: String, 
		required: false
	}

})


const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;


// MULTER => https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d


// Listing
// 	> ID
// 	> seller ID
// 	> Item Name
// 	> Category
// 		enum
// 	> Price
// 	> Description
// 	> Quantity
// 	> images
// 	> Relationship: belong to a specific user 
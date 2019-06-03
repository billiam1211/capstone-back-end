const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
	item_name: {
		type: String, 
		required: true
	},
	category: {
		type: String,
		enum : ['apparel', 'decorations', 'ceremony', 'reception', 'favors', 'other'],
		default: 'other',
		required: true
	},
	price: {
		type: String, 
		required: true
	}, 
	quantity: {
		type: Number, 
		required: true,
		default: 1
	},
	description: {
		type: String,
		required: true
	},
	images: {
		data: Buffer,
		contentType: String
	},
	sellerId: {
		type: String, 
		required: true
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
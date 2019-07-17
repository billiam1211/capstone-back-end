const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({	
	name: {
		type: String, 
		required: false
	},
	category: {
		type: String,
		enum : ['apparel', 'decorations', 'ceremony', 'reception', 'partyfavors', 'other'],
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
	},
	sellerEmail: {
		type: String,
		required: false
	}

})


const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;

/* Cart model */

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name: { type: String, required : true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required : true },
});

// A static method on the document model.
// Finds the a User document for the given username, and
// checks if password is correct
// CartSchema.statics.findByName = function(productName) {
// 	const Cart = this

// 	// find the user by its name (which is unique)
// 	return Cart.findOne({ name: productName }).then((product) => {
// 		if (!product) {
// 			return Promise.reject()
// 		}
// 		// if this user was found (ie. it exists), make sure their password is correct
// 		return new Promise((resolve, reject) => {
//             resolve(product)
// 			})
// 		})
// 	})
// }

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };

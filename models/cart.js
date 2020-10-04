/* Cart model */

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name: { type: String, required : true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required : true },
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = { Cart };

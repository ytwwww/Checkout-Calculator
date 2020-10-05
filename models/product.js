/* Product model */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required : true },
    price: { type: Number, required : true },
    fav: { type: Boolean, default: false },
    cart: { type: Boolean, default: false },
    quantity: {type: Number, default: 0}
});

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
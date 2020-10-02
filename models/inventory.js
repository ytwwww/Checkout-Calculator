/* Inventory model */

const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: { type: String, required : true },
    price: { type: Number, required : true },
    fav: { type: Boolean, default: false },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = { Inventory };

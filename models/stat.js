const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    numFavs: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    numItems: { type: Number, default: 0 }
});

const Stat = mongoose.model('Inventory', StatSchema);

module.exports = { Stat };

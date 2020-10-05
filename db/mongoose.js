'use strict';

const mongoose = require('mongoose');
// const uri = "mongodb+srv://user:user@store.kx3iq.mongodb.net/StoreAPI?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/StoreAPI', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// mongoose.connect(uri || 'mongodb://localhost:27017/StoreAPI', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

module.exports = { mongoose }
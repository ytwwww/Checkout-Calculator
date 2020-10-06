"use strict";

const express = require('express')
const app = express();

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

const { Product } = require("./models/product"); // import the mongoose model

// a POST route to add a product to inventory
// Request body expects:
// {
// 	"name": String,
// 	"price": Number
// }
// Returned JSON is the database document added.
app.post("/products", (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price
    });
	product.save().then((result) => {
		res.send(result);
	}).catch((err) => {
		res.status(400).send("Bad Request");
	});
});

// a GET route to get all products
app.get("/products", (req, res) => {
    Product.find().then(
        products => {
            res.send(products);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get 1 product by its id
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID");
        return;
    }
    Product.findById(id).then(
        products => {
            res.send(products);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a DELETE route to remove 1 product by its id
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID");
        return;
    }
    Product.findByIdAndDelete(id).then(
        products => {
            res.send(products);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get all favorite products
app.get("/favs", (req, res) => {
    Product.find({ fav: true }).then(
        products => {
            res.send(products);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get all items in cart
app.get("/cartItems", (req, res) => {
    Product.find({ cart: true }).then(
        products => {
            res.send(products);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/*
a PATCH route to change some properties of a product
Request Body Expects:
[
    {"op": "replace", "path": "/property", "value": "newValue"}
]

e.g.
[
    {"op": "replace", "path": "/fav", "value": "true"},
    {"op": "replace", "path": "/cart", "value": "true"},
    {"op": "replace", "path": "/quantity", "value": "1"}
]
Returned JSON: The updated product
*/
app.patch("/products/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID");
        return;
    }
    const fields = {}
    req.body.map((change) => {
        const property = change.path.substr(1)
        fields[property] = change.value
    })
    Product.findByIdAndUpdate(id, fields, {new: true}).then(
        product => {
            res.send(product);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

"use strict";
const log = console.log;

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { Cart } = require("./models/cart");
const { Inventory } = require("./models/inventory");

// a POST route to add a product to inventory
// Request body expects:
// {
// 	"name": String,
// 	"price": Number,
// 	"fav": Boolean
// }
// Returned JSON is the database document added.
app.post("/products", (req, res) => {
	const product = new Inventory({
		name: req.body.name,
		price: req.body.price,
		fav: req.body.fav
    });
	product.save().then((result) => {
		res.send(result);
	}).catch((err) => {
		res.status(400).send("Bad Request");
	});
});

// a POST route to add a product to cart
// Request body expects:
// {
// 	"name": String,
// 	"quantity": Number,
//  "price": Number,
// }
// Returned JSON is the database document added.
app.post("/cart", (req, res) => {
    console.log("post cart");
    // Cart.findOneAndUpdate({name: req.body.name}, {quantity: req.body.quantity}, {upsert: true})
    // Cart.findOneAndUpdate({name: req.body.name}, {new: true, quantity: req.body.quantity})
    // .then((result) => {
    // }).catch((err) => {
    //     const product = new Cart({
    //         name: req.body.name,
    //         quantity: req.body.quantity,
    //         price: req.body.price
    //     });
    //     product.save().then((result) => {
    //         res.send(result);
    //     }).catch((err) => {
    //         res.status(400).send("Bad Request");
    //     });
    //     res.status(400).send("Bad Request");
    // });

        // product => {
            // q = product.quantity;
        // },
        // error => {
            // const product = new Cart({
            //     name: req.body.name,
            //     quantity: req.body.quantity,
            //     price: req.body.price
            // });
            // product.save().then((result) => {
            //     res.send(result);
            // }).catch((err) => {
            //     res.status(400).send("Bad Request");
            // });
        // });
	const product = new Cart({
		name: req.body.name,
		quantity: req.body.quantity,
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
    Inventory.find().then(
        products => {
            res.send(products); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get all favorite products
app.get("/favs", (req, res) => {
    Inventory.find({ fav: true }).then(
        products => {
            res.send(products); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get all items in cart
app.get("/cart", (req, res) => {
    Cart.find().then(
        cart => {
            res.send(cart);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

app.patch("/product/:id/:change", (req, res) => {

});

app.patch("/cart/:id/:change", (req, res) => {
    const id = req.params.id;
    const change = req.params.change;
    if (!ObjectID.isValid(id)) {
		res.status(404).send("Resource not found");
		return;
    }
    Cart.findById(id).then((rest) => {
		if (!rest) {
			res.status(404).send("Resource Not found");
		} else {
			const target = rest.reservations.id(rid);
			target.time = req.body.time;
			target.people = req.body.people;

			rest.save().then((result) => {
				res.send({
					reservation: target,
					restaurant: rest
				})
			}).catch((err) => {
				res.staus(500).send("Internal Server Error");
			});
		}
	}).catch((err) => {
		res.status(500).send("Internal Server Error");
	})
});

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
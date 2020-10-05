const patcher = (id, changes) => {
  const url = "/products/" + id;
  const request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify(changes),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
  });

  fetch(request).then(
    res => {
      if (res.status === 200) {
          // console.log("Success")
      } else {
          console.log("Fail")
      }}
    ).catch(error => {
      console.log(error)
  })
}

export const addQuantity =  (app, product) => {
  let newCart = app.state.cartItems;

  // a function to compare products
  const isTarget = p => p.name === product.name;

  // find index of the product in cart
  const i = newCart.findIndex(isTarget);
  let n = 1; // keep track of quantity of product

  // if the product is not found in cart, add to cart
  
  if (i < 0) {
    product.quantity = 1;
    product.cart = true;
    newCart.push(product);

  // if the product is found in cart, update quantity
  } else {
    newCart[i].quantity ++;
    n = newCart[i].quantity;
  }

  let newStat = app.state.stats;
  newStat.numItems ++;
  newStat.total = Math.abs((app.state.stats.total + product.price).toFixed(2));

  app.setState({
    cartItems: newCart,
    stats: newStat
  });
  const changes = [
    {op: "replace", path: "/cart", "value": true},
    {op: "replace", path: "/quantity", "value": n}
  ];
  patcher(product._id, changes);
};

export const reduceQuantity = (app, product) => {
  let newCart = app.state.cartItems;

  // a function to compare products
  const isTarget = p => p.name === product.name;

  // find index of the product in cart
  const i = newCart.findIndex(isTarget);
  newCart[i].quantity --;

  const n = newCart[i].quantity;
  let incart = true;
  // remove product in cart if quantity is 0
  if (newCart[i].quantity < 1) {
    newCart[i].cart = false;
    newCart = newCart.filter(p => p.name !== product.name);
    incart = false;
  }

  let newStat = app.state.stats;
  newStat.numItems --;
  newStat.total = Math.abs((app.state.stats.total - product.price).toFixed(2));

  app.setState({
    cartItems: newCart,
    stats: newStat
  });
  console.log(newCart);
// console.log(app.state.cartItems);
  const changes = [
    {op: "replace", path: "/cart", "value": incart},
    {op: "replace", path: "/quantity", "value": n}
  ];
  patcher(product._id, changes);
};

export const toggleFav = (app, product) => {
  // a function to compare products
  const isTarget = p => p.name === product.name;
  
  let items = app.state.products;
  const i = items.findIndex(isTarget);
  const newBool = ! items[i].fav
  items[i].fav = newBool;

  let newStat = app.state.stats;
  if (items[i].fav) {
    newStat.favItems ++;
  } else {
    newStat.favItems --;
  }

  app.setState({
    products: items,
    stats: newStat,
  });

  const changes = [{op: "replace", path: "/fav", "value": newBool}];
  patcher(product._id, changes);
}


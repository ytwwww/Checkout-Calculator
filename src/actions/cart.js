export const addQuantity =  (app, product) => {
  let newCart = app.state.cartItems;

  // a function to compare products
  const isTarget = p => p.name === product.name;

  // find index of the product in cart
  const i = newCart.findIndex(isTarget);

  // if the product is not found in cart, add to cart
  if (i < 0) {
    newCart.push({name: product.name, quantity: 1, price: product.price});

  // if the product is found in cart, update quantity
  } else {
    newCart[i].quantity ++;
  }

  const newNumItems = app.state.stats.numItems + 1
  const newTotal = (app.state.stats.total + product.price);
  app.setState({
    cartItems: newCart,
    stats: {numItems: newNumItems, total: newTotal}
  });
};

export const reduceQuantity = (app, product) => {
  let newCart = app.state.cartItems;

  // a function to compare products
  const isTarget = p => p.name === product.name;

  // find index of the product in cart
  const i = newCart.findIndex(isTarget);
  newCart[i].quantity --;

  // remove product in cart if quantity is 0
  if (newCart[i].quantity < 1) {
    newCart = newCart.filter(p => p.name !== product.name);
  }

  // update stats
  const newNumItems = app.state.stats.numItems - 1
  const newTotal = app.state.stats.total - product.price

  app.setState({
    cartItems: newCart,
    stats: {numItems: newNumItems, total: newTotal}
  });
};

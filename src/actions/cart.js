export const addQuantity =  (app, product) => {
  const targets = app.state.products.filter(p => p.name === product.name);
  if (targets.length < 1) {
    return;
  }
  const foundProducts = app.state.cartItems.filter(p => p.name === product.name);
  let newCart = app.state.cartItems.filter(p => p.name !== product.name);
  if (foundProducts.length > 0) {
    foundProducts[0].quantity ++;
    newCart.push(foundProducts[0]);
  } else {
    newCart.push({name: product.name, quantity: 1, price: product.price});
  }
  const newNumItems = app.state.stats.numItems + 1
  const newTotal = app.state.stats.total + product.price
  app.setState({
    cartItems: newCart,
    stats: {numItems: newNumItems, total: newTotal}
  });
};

export const reduceQuantity = (app, product) => {
  const cart = app.state.cartItems
  const target = cart.filter(p => p.name === product.name);
  let newCart = cart.filter(p => p.name !== product.name);
  if (target.length > 0) {
    target[0].quantity --;
    // if product has at least 1 unit
    if (target[0].quantity >= 1) {
      newCart.push(target[0]);
    }
  }
  const newNumItems = app.state.stats.numItems - 1
  const newTotal = app.state.stats.total - product.price
  app.setState({
    cartItems: newCart,
    stats: {numItems: newNumItems, total: newTotal}
  });
};

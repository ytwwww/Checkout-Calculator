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

  let newStat = app.state.stats;
  app.state.stats.numItems ++;
  app.state.stats.total += product.price;

  app.setState({
    cartItems: newCart,
    stats: newStat
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
  let newStat = app.state.stats;
  app.state.stats.numItems --;
  app.state.stats.total -= product.price;

  app.setState({
    cartItems: newCart,
    stats: newStat
  });
};

export const toggleFav = (app, product) => {
  // a function to compare products
  const isTarget = p => p.name === product.name;

  let items = app.state.products;
  const i = items.findIndex(isTarget);
  items[i].fav = ! items[i].fav;

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
}
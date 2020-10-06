import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Bar from "./components/Bar"
import Cart from "./components/Cart"
import Inventory from './components/Inventory';
import { calculateQuantityAndTotal, addQuantity, reduceQuantity, toggleFav } from "../src/actions/cart";

class App extends React.Component {
  state = {
    products: [],
    cartItems: [],
    stats: {numItems: 0, total: 0, favItems: 0}
  }

  componentDidMount() {
    fetch('/products')
    .then((response) => response.json())
    .then(allproducts => {
      const nFavs = allproducts.filter(p => p.fav).length;
      const cartContent = allproducts.filter(p => p.cart);
      const qtyttl = calculateQuantityAndTotal(cartContent);
      this.setState({ 
        products: allproducts,
        cartItems: cartContent,
        stats: {numItems: qtyttl.quantity, total: qtyttl.total, favItems: nFavs}
      });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (
              <div>
                <Bar 
                  num={this.state.stats.numItems}
                  favNum={this.state.stats.favItems}
                />
                <Inventory
                  component={this}
                  products={this.state.products} 
                  cart={this.state.cartItems}
                  addFunc={() => addQuantity(this)}
                  favFunc={() => toggleFav(this)}
                />
              </div>
            )}/>

            <Route exact path='/cart' render={() => (
              <div>
                <Bar 
                  num={this.state.stats.numItems}
                  favNum={this.state.stats.favItems}
                />
                <Cart
                  component={this}
                  cart={this.state.cartItems}
                  stats={this.state.stats}
                  addFunc={() => addQuantity(this)}
                  reduceFunc={() => reduceQuantity(this)}
                />
              </div>
            )}/>

            <Route exact path='/favorite' render={() => (
              <div>
                <Bar 
                  num={this.state.stats.numItems}
                  favNum={this.state.stats.favItems}
                />
                <Inventory
                  component={this}
                  products={this.state.products.filter(p => p.fav)}
                  cart={this.state.cartItems}
                  addFunc={() => addQuantity(this)}
                  favFunc={() => toggleFav(this)}
                />
              </div>
            )}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

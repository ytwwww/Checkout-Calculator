import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Bar from "./components/Bar"
import CartContent from "./components/CartContent"
import Inventory from './components/Inventory';
import { addQuantity, reduceQuantity, toggleFav } from "../src/actions/cart";

class App extends React.Component {
  state = {
    products: [
        {name: "Apple", price: 1.70, fav: false},
        {name: "Dragonfruit", price: 5.00, fav: false},
        {name: "Juice", price: 2.00, fav: false},
        {name: "Banana", price: 0.51, fav: false},
        {name: "Watermelon", price: 7.56, fav: false},
        {name: "Kiwi", price: 1.50, fav: false},
        {name: "Spinach", price: 2.59, fav: false},
        {name: "Cabbage", price: 1.58, fav: false},
        {name: "Pork", price: 8.22, fav: false},
        {name: "Beef", price: 10.11, fav: false}],
    cartItems: [],
    stats: {numItems: 0, total: 0, favItems: 0}
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
                  isFav={false}
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
                <CartContent 
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
                  isFav={true}
                  component={this}
                  products={this.state.products} 
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

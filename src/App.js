import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Bar from "./components/Bar"
import CartContent from "./components/CartContent"
import Inventory from './components/Inventory';
import { addQuantity, reduceQuantity } from "../src/actions/cart";

class App extends React.Component {
  state = {
    products: [
        {name: "Apple", price: 1},
        {name: "Dragonfruit", price: 5},
        {name: "Juice", price: 2},
        {name: "Banana", price: 0.5},
        {name: "Watermelon", price: 7.5},
        {name: "Kiwi", price: 1.33},
        {name: "Spinach", price: 2.5},
        {name: "Cabbage", price: 1.5},
        {name: "Pork", price: 8},
        {name: "Beef", price: 10}],
    cartItems: [],
    stats: {numItems: 0, total: 0}
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (
              <div>
                <Bar num={this.state.stats.numItems}/>
                <Inventory
                  component={this}
                  products={this.state.products} 
                  cart={this.state.cartItems}
                  addFunc={() => addQuantity(this)}
                />
              </div>
            )}/>

            <Route exact path='/cart' render={() => (
              <div>
                <Bar num={this.state.stats.numItems}/>
                <CartContent 
                  component={this}
                  cart={this.state.cartItems}
                  stats={this.state.stats}
                  addFunc={() => addQuantity(this)}
                  reduceFunc={() => reduceQuantity(this)}
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

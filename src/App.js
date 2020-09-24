import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import './App.css';
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" >
            Store
          </Typography>
          <Cart/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;

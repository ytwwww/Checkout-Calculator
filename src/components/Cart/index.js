import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ListSubheader, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// Citation: https://material-ui.com/components/drawers/
const useStyles = makeStyles({
  list: {
    width: 320,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Cart() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListSubheader>Your Shopping Cart</ListSubheader>
        {['Product A', 'Product B', 'Product C', 'Product D'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
            <ListItemText primary={text} />
            <ListItemText primary={2} />
            <ListItemText primary={"10CAD"} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Number of Items', 'Discount', 'Total'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
            <ListItemText primary={text} />
            <ListItemText primary={0} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Shopping Cart" aria-label="Shopping Cart">
            <IconButton aria-label="shopping cart" edge="end" color="inherit" onClick={toggleDrawer(anchor, true)}>
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
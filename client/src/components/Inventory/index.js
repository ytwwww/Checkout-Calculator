import React from "react";
import { uid } from "react-uid";
import { IconButton, Paper, Button, Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addQuantity, toggleFav } from "../../actions/cart";
import InventoryHeader from '../InventoryHeader';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      margin: "2px",
    },
    button: {
        margin: theme.spacing(1),
        textTransform: "none",
    },
});

class Inventory extends React.Component {
    render() {
        const { component, classes } = this.props;
        const productList = this.props.products;

        return (
            <div>
                <InventoryHeader />

                {productList.length === 0 ?
                    // empty list
                    <Grid container alignItems="center" justify="center">
                        <br /><br />
                        <Grid item xs={8}>
                            <Paper elevation={0} className={classes.paper}>Your list is empty.</Paper>
                        </Grid>
                    </Grid>

                    // non-empty list
                    : productList.map((product) => (
                        <div key={uid(product)}>
                            <Grid container justify="center" alignItems="center">

                                {/* favorite button */}
                                <Grid item xs={2}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        <IconButton
                                            variant="contained"
                                            className={classes.button}
                                            onClick={toggleFav.bind(this, component, product)}
                                        >
                                            {product.fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Paper>
                                </Grid>

                                {/* product name */}
                                <Grid item xs={3}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        {product.name}
                                    </Paper>
                                </Grid>

                                {/* price */}
                                <Grid item xs={3}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        {"CDN$ "}
                                        <strong>{product.price.toFixed(2)}</strong>
                                    </Paper>
                                </Grid>

                                {/* button to add product to cart */}
                                <Grid item xs={4}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={addQuantity.bind(this, component, product)}
                                        >
                                            Add
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Divider />
                        </div>
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Inventory);

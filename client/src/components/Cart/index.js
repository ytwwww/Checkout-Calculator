import React from "react";
import { uid } from "react-uid";
import { Tooltip, Divider, Paper, Grid, IconButton } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles } from "@material-ui/core/styles";
import { calculateSubtotal, addQuantity, reduceQuantity } from "../../actions/cart"; 
import CartHeader from "../CartHeader";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      margin: "2px",
    },
});

class Cart extends React.Component {
    render() {
        const { component, classes } = this.props;

        return (
            <div>
                <CartHeader />
                {this.props.stats.numItems === 0 ?
                    // empty cart
                    <Grid container alignItems="center" justify="center">
                        <br /><br />
                        <Grid item xs={8}>
                            <Paper elevation={0} className={classes.paper}>Your cart is empty.</Paper>
                        </Grid>
                    </Grid>
                : // non-empty cart
                this.props.cart.map((product) => (
                    <div key={uid(product)} >
                        <Grid container alignItems="center">
                            {[product.name, product.quantity, calculateSubtotal(product)].map((item) => (
                                <Grid key={uid(item)} item xs={3}>
                                    <Paper elevation={0} className={classes.paper}>{item}</Paper>
                                </Grid>
                            ))}

                            {/* add and minus buttos for each item */}
                            <Grid item xs={3}>
                                <Grid justify="space-evenly" container>
                                    <Grid item>
                                        <Tooltip title="Reduce one unit">
                                            <IconButton onClick={reduceQuantity.bind(this, component, product)}>
                                                    <RemoveIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                        <Tooltip title="Add one more">
                                            <IconButton onClick={addQuantity.bind(this, component, product)}>
                                                <AddIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                    </div>
                ))}
                <br />
                <Grid container justify="flex-end" alignItems="center">
                        <Grid item xs={4}>
                            <Paper elevation={1} className={classes.paper}>
                                <strong>Number of Items</strong>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={1} className={classes.paper}>
                                <strong>{this.props.stats.numItems}</strong>
                            </Paper>
                        </Grid>
                </Grid>
                <br />
                <Grid container justify="flex-end" alignItems="center">
                        <Grid item xs={4}>
                            <Paper elevation={1} className={classes.paper}>
                                <strong>Total</strong>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={1} className={classes.paper}>
                                <strong>{this.props.stats.total}</strong>
                            </Paper>
                        </Grid>
                </Grid>
                <br />
            </div>
        );
    }
}

export default withStyles(styles)(Cart);

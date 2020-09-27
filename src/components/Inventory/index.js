import React from "react";
import { uid } from "react-uid";
import { Paper, Button, Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addQuantity } from "../../actions/cart";

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

        return (
            <div>
                <Grid container justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    <strong>Name</strong>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    <strong>Price</strong>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </Grid>
                <Divider />
                {this.props.products.map((product) => (
                    <div key={uid(product)}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    {product.name}
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    {"CDN$ "}
                                    <strong>{product.price}</strong>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
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

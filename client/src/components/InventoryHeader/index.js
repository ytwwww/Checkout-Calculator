import React from "react";
import { uid } from "react-uid";
import { Paper, Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

class InventoryHeader extends React.Component {
    render() {
        const { component, classes } = this.props;
        const productList = this.props.isFav ?
            this.props.products.filter(p => p.fav)
            : this.props.products;

        return (
            <div>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={2}></Grid>
                    {["Name", "Price"].map((field) => (
                        <Grid key={uid(field)} item xs={3}>
                            <Paper elevation={0}  className={classes.paper}>
                                <strong>{field}</strong>
                            </Paper>
                        </Grid>
                    ))}
                    <Grid item xs={4}></Grid>
                </Grid>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(InventoryHeader);

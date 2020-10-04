import React from "react";
import { uid } from "react-uid";
import { Divider, Paper, Grid,} from '@material-ui/core/';
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
});

class CartHeader extends React.Component {
    render() {
        const { classes } = this.props;
        const xsNum = 3;
        const elevationLevel = 0;

        return (
            <div>
                <Grid container>
                    {["Name", "Quantity", "Subtotal", "Actions"].map((item) => (
                        <Grid key={uid(item)} item xs={xsNum}>
                            <Paper elevation={elevationLevel} className={classes.paper}>
                                <strong>{item}</strong>
                            </Paper>
                        </Grid>))}
                </Grid>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(CartHeader);

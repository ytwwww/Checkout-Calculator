import React from "react";
import { Link } from 'react-router-dom';
import {Grid, AppBar, Toolbar, Typography, IconButton, Badge} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './index.css';

class Bar extends React.Component {
    render() {
        return (
            <div id="appbar">
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid justify="space-between" container>
                            <Grid item>
                                <Link to={"/"}>
                                    <Typography variant="h4">
                                        Store
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={"/cart"}>
                                    <IconButton color="inherit">
                                        <Badge badgeContent={this.props.num} color="secondary">
                                            <ShoppingCartIcon/>
                                        </Badge>
                                    </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Bar;

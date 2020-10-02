import React from "react";
import { Link } from 'react-router-dom';
import { Tooltip, Grid, AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StorefrontIcon from '@material-ui/icons/Storefront';
import './index.css';

class Bar extends React.Component {
    render() {
        return (
            <div id="appbar">
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid justify="space-between" container>

                            <Grid item>
                                <Link to={"/favorite"}>
                                    <Tooltip title="Favorites">
                                        <IconButton color="inherit">
                                            <Badge badgeContent={this.props.favNum} color="secondary">
                                                <FavoriteIcon/>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link to={"/"}>
                                    <Tooltip title="Home Page">
                                        <IconButton color="inherit">
                                                <StorefrontIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link to={"/cart"}>
                                    <Tooltip title="Shopping Cart">
                                        <IconButton color="inherit">
                                            <Badge badgeContent={this.props.num} color="secondary">
                                                <ShoppingCartIcon/>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
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

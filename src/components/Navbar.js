import {Component} from "react";
import React from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button/Button";
// import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';


const CustomMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const textMenuStyle = {
        textDecoration: 'none',
        color: "#000"
    };

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <header>

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color: "#FFF"}}>
                <MenuIcon/>
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <Link to="/" style={textMenuStyle}>
                    <MenuItem onClick={handleClose}>
                        Presensi

                    </MenuItem>
                </Link>

                <Link to="register" style={textMenuStyle}>
                    <MenuItem onClick={handleClose}>
                        Register
                    </MenuItem>
                </Link>

                <Link to="/issue" style={textMenuStyle}>
                    <MenuItem onClick={handleClose}>
                        Issue
                    </MenuItem>
                </Link>
            </Menu>

        </header>
    );
};

class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <CustomMenu/>
                    </IconButton>
                    {/*<Typography variant="h6">*/}
                    {/*News*/}
                    {/*</Typography>*/}
                    {/*<Button color="inherit" edge="end">Login</Button>*/}
                </Toolbar>
            </AppBar>

        )

    }

}

export default Navbar;
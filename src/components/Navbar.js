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

    function onClickListPresensi() {
        // window.location.href = 'https://bit.ly/list-presensi-hmif';
        window.open(
            'https://bit.ly/list-presensi-hmif',
            '_blank' // <- This is what makes it open in a new window.
        );
    }


    return (
        <header>

            <div style={{display: "flex"}}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color: "#FFF"}}>
                    <MenuIcon/>
                </Button>

            </div>

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

                <Link to="/secret" style={textMenuStyle}>
                    <MenuItem onClick={handleClose}>
                        Secret
                    </MenuItem>
                </Link>

                <MenuItem onClick={onClickListPresensi}>
                    List
                </MenuItem>
            </Menu>

        </header>
    );
};

class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let toolbarTitle = null;

        switch (window.location.pathname) {
            case "/":
                toolbarTitle = "PRESENSI HMIF";
                break;
            case "/presensi":
                toolbarTitle = "PRESENSI HMIF";
                break;
            case "/register":
                toolbarTitle = "REGISTRASI NIM ke HP";
                break;
            case "/issue":
                toolbarTitle = "QRCODE REGISTRASI";
                break;
            case "/secret":
                toolbarTitle = "QRCODE PRESENSI";
                break;
        }

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <CustomMenu/>
                    </IconButton>

                    <div style={{fontSize: "16px", marginTop: "-5px"}}>{toolbarTitle}</div>
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
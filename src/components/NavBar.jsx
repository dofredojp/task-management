import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Handle logout logic here
        alert('Logged out!');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Task Management App
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                >
                    <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                        View Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ marginRight: 1 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

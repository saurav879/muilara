import React, {useEffect} from "react";
import { Navigate, Outlet, NavLink as RouteLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from '../contexts/AuthContext';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb'
import AccountPopover from "./header/AccountPopover";

export default function DefaultLayout() {
    const { user, setUser } = useAuth();
    const navItems = [
        { name: 'Profile', href: '/profile' },
        { name: 'About', href: '/about' },
        { name: 'Users', href: '/users' },
    ];

    // check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					window.location.href = '/';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}

	// logout user
	const handleLogout = async () => {
		try {
			const resp = await axios.post('/logout');
			if (resp.status === 200) {
				localStorage.removeItem('user');
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography 
                                variant="h6"
                                noWrap
                                component={"a"}
                                href="/"
                                sx={{
                                    flexGrow: 1,
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{ display: {xs: 'none', sm: 'block'} }}>
                                {navItems.map((item) => (
                                    <Button component={RouteLink} to={item.href} key={item.name} sx={{ color: '#fff'}}>
                                        {item.name}
                                    </Button>
                                ))}
                                <Button  onClick={handleLogout} sx={{ color: '#fff'}}>
                                        Logout
                                </Button>
                                <AccountPopover />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Box component="main" sx={{ p: 3 }}>
                    <Container maxWidth="xl">
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </>
    )
}
import React from 'react'
import {
    Avatar,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
    Button,
    Alert,
    Collapse,
    IconButton
} from "@mui/material";
import axios from "../axios";
import { NavLink, Navigate} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';


function Copyright(props) {
    return (
        <Typography variant="body2"
            color={"text.secondary"}
            align="center"
            {...props}>
            {'Copyright ©'}
            <Link color={"inherit"}>
                Your Website
            </Link>
            {' '}
            {
            new Date().getFullYear()
        }
            {'.'} </Typography>
    );
}

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);

	// login user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/dashboard" />;
			}
		} catch (error) {
			if (error.response.status === 401 || error.response.status === 422) {
				setError(error.response.data.message);
                setOpen(true);
			}
		}
	};

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={
                {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }>
                
                <Avatar sx={
                    {
                        m: 1,
                        bgcolor: 'secondary.main'
                    }
                }>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                
                    <Box component={"div"} sx={{mt: 1, width: '100%'}}>
                    <Collapse in={open}>
                        <Alert 
                            severity="error"
                            action={
                                <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize='inherit'/>
                                </IconButton>
                            }
                        >
                            {error}
                        </Alert>
                    </Collapse>
                
                </Box>
                
                <Box component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={
                        {mt: 1}
                }>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <FormControlLabel control={
                            <Checkbox
                        value="remember"
                        color="primary"/>
                        }
                        label="Remember me"/>
                    <Button type="submit" fullWidth variant="contained"
                        sx={
                            {
                                mt: 3,
                                mb: 2
                            }
                    }>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={NavLink} to={"/register"} variant="body2">
                                {"Don't have an account? Sign Up"} </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;

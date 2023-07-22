import React from "react";
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
    Button
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {

    const { setUser } = useAuth();
	const [nameError, setNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword } = e.target.elements;
		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: cpassword.value,
		};
		try {
			const resp = await axios.post('/register', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/dashboard" />;
			}
		} catch (error) {
			if (error.response.status === 422 ) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.name) {
					setNameError(error.response.data.errors.name[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.errors.password) {
					setPasswordError(error.response.data.errors.password[0]);
				} else {
					setPasswordError('');
				}
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
                    Sign up
                </Typography>
                <Box component="form" noValidate
                    onSubmit={handleSubmit}
                    sx={
                        {mt: 3}
                }>
                    <Grid container
                        spacing={2}>
                        <Grid item
                            xs={12}
                            sm={6}>
                            <TextField autoComplete="given-name" name="name" error={nameError.length > 0 ? true : false} required fullWidth id="name" label="First Name" autoFocus helperText={nameError.length > 0 ?  nameError  : ''} />
                        </Grid>
                        <Grid item
                            xs={12}
                            sm={6}>
                            <TextField required fullWidth id="lastName" label="Last Name" name="lastname" autoComplete="family-name"/>
                        </Grid>
                        
                        <Grid item
                            xs={12}>
                            <TextField required error={emailError.length > 0 ? true : false} fullWidth id="email" label="Email Address" name="email" autoComplete="email" helperText={emailError.length > 0 ?  emailError  : ''}/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField  required fullWidth name="password" error={passwordError.length > 0 ? true : false} label="Password" type="password" id="password" autoComplete="" helperText={passwordError.length > 0 ?  passwordError  : ''}/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField required fullWidth name="cpassword" label="Confirm Password" type="password" id="cpassword" autoComplete=""/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <FormControlLabel control={
                                    <Checkbox
                                value="allowExtraEmails"
                                color="primary"/>
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."/>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained"
                        sx={
                            {
                                mt: 3,
                                mb: 2
                            }
                    }>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={NavLink} to={'/'} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}

export default Register;

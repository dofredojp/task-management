import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

// Validation Schema using Yup
const validationSchema = Yup.object({
    username: Yup.string()
        .min(4, 'Username should be of minimum 4 characters length')
        .required('Username is required'),
    email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Registration = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();                        

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',  
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await api.post('/api/signup', {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });

                setOpenSnackbar(true);
                setErrorMessage(''); 

            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message || 'Registration failed, please try again.'
                );
                setOpenSnackbar(true);
            }
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/* Username Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />

                    {/* Email Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    {/* Password Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirm-password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>

                    {/* Button to redirect to Login page */}
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </Button>
                </Box>

                {/* Snackbar for success or error notification */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={errorMessage ? 'error' : 'success'}
                        sx={{ width: '100%' }}
                    >
                        {errorMessage || 'Registration successful!'}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default Registration;

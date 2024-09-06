
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../services/axios'; // interceptor

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            // Axios API call to login
            const response = await api.post('/api/login', values);
            const { token } = response.data;

            localStorage.setItem('token', token);
            window.location.href = '/home';
        } catch (err) {
            setErrors({ apiError: err.response?.data?.message || 'Login failed' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegisterRedirect = () => {
        window.location.href = '/registration';
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Welcome to Task Management App
                </Typography>

                {/* Formik form */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            {/* Email field */}
                            <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />

                            {/* Password field */}
                            <Field
                                name="password"
                                as={TextField}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                            />

                            {/* Display API error */}
                            {errors.apiError && (
                                <Typography color="error" variant="body2">
                                    {errors.apiError}
                                </Typography>
                            )}

                            {/* Login button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                style={{ marginTop: '1rem' }}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>

                            {/* Register Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleRegisterRedirect} // Register Redirect
                                sx={{ mt: 1 }}
                            >
                                Register
                            </Button>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Login;

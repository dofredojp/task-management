// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Login = () => {
    // Define the initial form values
    const initialValues = {
        username: '',
        password: '',
    };

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    // Define the form submission logic
    const onSubmit = (values) => {
        console.log('Form data', values);
        // You can handle form submission here, like making an API call
    };

    // Custom styled components
    const StyledForm = styled(Form)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
    });

    const StyledTextField = styled(TextField)({
        width: '100%',
    });

    return (
        <>
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <StyledForm onSubmit={handleSubmit}>
                                <StyledTextField
                                    label="Username"
                                    name="username"
                                    variant="outlined"
                                    value={values.username}
                                    onChange={handleChange}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                                <StyledTextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    Login
                                </Button>
                            </StyledForm>
                        )}
                    </Formik>
                </Box>
            </Container>
        </>

    );
};

export default Login;

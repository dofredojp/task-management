import { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Grid, Paper } from '@mui/material';

const ProfileSettings = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // Here you would typically send the updated profile data to the server
        alert('Profile updated successfully!');
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Profile Settings
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Box mb={2}>
                    <Typography variant="h6">Personal Information</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileSettings;

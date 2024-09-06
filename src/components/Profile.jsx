import { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import NavBar from './NavBar';

const ProfileSettings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Verify token and fetch user profile
                const response = await api.get('/api/profile');

                setProfile(response.data);
            } catch (err) {
                console.log(err)
                setError('Failed to load profile. Please try again.');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            setOpenSnackbar(true);
            return;
        }

        try {
            await api.post('/api/change-password', {
                currentPassword,
                newPassword,
            });

            setSuccess('Password changed successfully!');
            setOpenSnackbar(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            console.log("ERROR: ", err)
            setError('Failed to change password. Please try again.');
            setOpenSnackbar(true);
        }
    };

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>; // Display loading text
    }

    return (
        <>
            <NavBar />
            <Container component="main" maxWidth="xs" style={{ marginTop: '20px' }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Profile Settings
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        {/* Display Profile Details */}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Username"
                            value={profile?.username || ''}
                            InputProps={{ readOnly: true }}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={profile?.email || ''}
                            InputProps={{ readOnly: true }}
                        />

                        {/* Change Password Section */}
                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Change Password
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>

                    </Box>

                    {/* Snackbar for success or error messages */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={4000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity={error ? 'error' : 'success'}
                            sx={{ width: '100%' }}
                        >
                            {error || success}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </>

    );
};

export default ProfileSettings;

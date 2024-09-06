import { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import NavBar from './NavBar';

const ProfileSettings = () => {
    const [profile, setProfile] = useState(null); // State to store profile data
    const [loading, setLoading] = useState(true); // State for loading spinner
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success messages
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [currentPassword, setCurrentPassword] = useState(''); // State for current password
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State for confirm new password
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Verify token and fetch user profile
                const response = await api.get('/api/profile');

                setProfile(response.data); // Set profile data
            } catch (err) {
                console.log(err)
                setError('Failed to load profile. Please try again.');
                setOpenSnackbar(true);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchProfile(); // Fetch profile on component mount
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

                        {/* Button to Back to Home */}
                        {/* <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/home')}
                        >
                            Back to Home
                        </Button> */}
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

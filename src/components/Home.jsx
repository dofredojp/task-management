// import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from './NavBar'; // Import the NavBar component

const TaskCard = styled(Card)({
    maxWidth: 345,
    margin: '16px',
    textAlign: 'center',
});

const HomePage = () => {
    return (
        <div>
            <NavBar /> {/* Add the NavBar component */}
            <Container>
                <Box my={4}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Overview
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TaskCard>
                                <CardContent>
                                    <Typography variant="h6">Total Tasks</Typography>
                                    <Typography variant="h4">120</Typography>
                                </CardContent>
                            </TaskCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TaskCard>
                                <CardContent>
                                    <Typography variant="h6">Pending Tasks</Typography>
                                    <Typography variant="h4">45</Typography>
                                </CardContent>
                            </TaskCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TaskCard>
                                <CardContent>
                                    <Typography variant="h6">Completed Tasks</Typography>
                                    <Typography variant="h4">75</Typography>
                                </CardContent>
                            </TaskCard>
                        </Grid>
                    </Grid>
                </Box>
                <Box my={4} textAlign="center">
                    <Button variant="contained" color="primary" size="large">
                        Manage Tasks
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default HomePage;

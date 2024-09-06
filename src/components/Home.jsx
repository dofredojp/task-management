import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Button } from '@mui/material';
import NavBar from './NavBar';
import api from '../services/axios'

const TaskDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Task statistics
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);

    const navigate = useNavigate();

    // Function to fetch tasks from the API
    const fetchTasks = async () => {

        try {
            const response = await api.get('/api/tasks');

            const tasksData = response.data.tasks;

            setTotalTasks(response.data.totalTasks);
            setCompletedTasks(tasksData.filter(task => task.status == 'completed').length);
            setPendingTasks(tasksData.filter(task => task.status != 'completed').length);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch tasks. Please relogin and try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ marginTop: '20px' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Task Management Dashboard
            </Typography>

            {/* Statistics Widget */}
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
                <Grid item xs={12} sm={4}>
                    <Card style={{ backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h6">Total Tasks</Typography>
                            <Typography variant="h4">{totalTasks}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card style={{ backgroundColor: '#dff0d8' }}>
                        <CardContent>
                            <Typography variant="h6">Completed Tasks</Typography>
                            <Typography variant="h4">{completedTasks}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card style={{ backgroundColor: '#f2dede' }}>
                        <CardContent>
                            <Typography variant="h6">Pending Tasks</Typography>
                            <Typography variant="h4">{pendingTasks}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Button to Task Management Page */}
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '20px' }}
                onClick={() => navigate('/taskmgnt')}
            >
                Go to Task Management
            </Button>

        </Container>
        </>
    );
};

export default TaskDashboard;

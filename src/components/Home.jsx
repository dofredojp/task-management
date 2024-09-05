import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Button } from '@mui/material';

// Function to get the JWT token from localStorage
const getToken = () => localStorage.getItem('token');

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Task statistics
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);

    const navigate = useNavigate(); // For navigation

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        const token = getToken();
        try {
            const response = await axios.get('http://localhost:3000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the JWT token in the Authorization header
                },
            });

            const tasksData = response.data.tasks;
            setTasks(tasksData);

            // Calculate statistics
            setTotalTasks(tasksData.length);
            setCompletedTasks(tasksData.filter(task => task.completed).length);
            setPendingTasks(tasksData.filter(task => !task.completed).length);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch tasks. Please relogin and try again.');

            // Redirect to home page after successful login
            // window.location.href = '/login';
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


            {/* Task List */}
            {/* {tasks.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No tasks available.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {tasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {task.description}
                                    </Typography>
                                    <Typography variant="body2" color={task.completed ? 'green' : 'red'}>
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
            )} */}
        </Container>
    );
};

export default TaskDashboard;

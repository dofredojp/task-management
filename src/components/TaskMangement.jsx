import { useState } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const initialTasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3' }
];

const TaskManagement = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleAddTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: taskTitle,
            description: taskDescription
        };
        setTasks([...tasks, newTask]);
        handleCloseDialog();
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setDialogOpen(true);
    };

    const handleUpdateTask = () => {
        const updatedTasks = tasks.map(task =>
            task.id === currentTask.id
                ? { ...task, title: taskTitle, description: taskDescription }
                : task
        );
        setTasks(updatedTasks);
        handleCloseDialog();
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentTask(null);
        setTaskTitle('');
        setTaskDescription('');
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Task Management
            </Typography>
            <Box mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                >
                    Add New Task
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditTask(task)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteTask(task.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding/editing tasks */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{currentTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={currentTask ? handleUpdateTask : handleAddTask}
                        color="primary"
                    >
                        {currentTask ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskManagement;

import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { DateTime } from 'luxon';
import api from '../services/axios'

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTitle, setSearchTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterDueDate, setFilterDueDate] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [page, rowsPerPage, searchTitle, filterStatus, filterPriority, filterDueDate]);

    const fetchTasks = async () => {
        try {
            const params = new URLSearchParams({
                page: page + 1,
                limit: rowsPerPage,
                title: searchTitle,
                status: filterStatus,
                priority: filterPriority,
                dueDate: filterDueDate ? filterDueDate.toISODate() : null,
            });

            const response = await api.get(`/api/tasks/search?${params.toString()}`);
            setTasks(response.data.tasks);
            setTotalCount(response.data.totalCount);
            setTotalPages(response.data.totalPages); // Set totalPages from response
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            status,
            priority,
            dueDate,
    };

      try {
          if (editingTask) {
              await api.put(`/api/tasks/${editingTask._id}`, taskData);
          } else {
              await api.post('/api/tasks', taskData);
          }
          fetchTasks();
          resetForm();
          handleCloseDialog();
    } catch (error) {
        console.error('Error saving task:', error);
    }
  };

    const resetForm = () => {
        setTitle('');
        setStatus('');
        setPriority('');
        setDueDate(null);
        setEditingTask(null);
    };

    const handleOpenDialog = (task = null) => {
        setEditingTask(task);
        if (task) {
            setTitle(task.title);
            setStatus(task.status);
            setPriority(task.priority);
            setDueDate(task.dueDate ? DateTime.fromISO(task.dueDate) : null);
        } else {
            resetForm();
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={8}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                      <Typography variant="h5" align="center" gutterBottom>
                          Task Management
            </Typography>

                      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                          <Grid item xs={12} md={3}>
                              <TextField
                                  label="Search Title"
                                  value={searchTitle}
                                  onChange={(e) => setSearchTitle(e.target.value)}
                                  fullWidth
                                  InputProps={{
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <SearchIcon />
                                          </InputAdornment>
                                      ),
                                  }}
                              />
                          </Grid>
                          <Grid item xs={12} md={3}>
                              <TextField
                                  label="Status"
                                  select
                                  fullWidth
                                  value={filterStatus}
                                  onChange={(e) => setFilterStatus(e.target.value)}
                                  margin="normal"
                              >
                                  <MenuItem value="">All</MenuItem>
                                  <MenuItem value="pending">Pending</MenuItem>
                                  <MenuItem value="in-progress">In Progress</MenuItem>
                                  <MenuItem value="completed">Completed</MenuItem>
                              </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                              <TextField
                                  label="Priority"
                                  select
                                  fullWidth
                                  value={filterPriority}
                                  onChange={(e) => setFilterPriority(e.target.value)}
                                  margin="normal"
                              >
                                  <MenuItem value="">All</MenuItem>
                                  <MenuItem value="low">Low</MenuItem>
                                  <MenuItem value="medium">Medium</MenuItem>
                                  <MenuItem value="high">High</MenuItem>
                              </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                              <DatePicker
                                  label="Due Date"
                                  value={filterDueDate}
                                  onChange={(newDate) => setFilterDueDate(newDate)}
                                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                              />
                          </Grid>
                      </Grid>

                      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} fullWidth>
                          Add Task
                      </Button>

                      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                          <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                          <DialogContent>
                              <form onSubmit={handleSubmit}>
                                  <TextField
                                      label="Title"
                                      fullWidth
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      margin="normal"
                                      required
                                  />
                                  <TextField
                                      label="Status"
                                      select
                                      fullWidth
                                      value={status}
                                      onChange={(e) => setStatus(e.target.value)}
                                      margin="normal"
                                      required
                                  >
                                      <MenuItem value="pending">Pending</MenuItem>
                                      <MenuItem value="in-progress">In Progress</MenuItem>
                                      <MenuItem value="completed">Completed</MenuItem>
                                  </TextField>
                                  <TextField
                                      label="Priority"
                                      select
                                      fullWidth
                                      value={priority}
                                      onChange={(e) => setPriority(e.target.value)}
                                      margin="normal"
                                      required
                                  >
                                      <MenuItem value="low">Low</MenuItem>
                                      <MenuItem value="medium">Medium</MenuItem>
                                      <MenuItem value="high">High</MenuItem>
                                  </TextField>
                                  <DatePicker
                                      label="Due Date"
                                      value={dueDate}
                                      onChange={(newDate) => setDueDate(newDate)}
                                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                  />
                                  <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>
                                      {editingTask ? 'Update Task' : 'Add Task'}
                                  </Button>
                              </form>
                          </DialogContent>
                          <DialogActions>
                              <Button onClick={handleCloseDialog} color="primary">
                                  Cancel
                </Button>
                          </DialogActions>
                      </Dialog>

            <TableContainer component={Paper}>
                          <Table>
                              <TableHead>
                                  <TableRow>
                                      <TableCell>Title</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell>Priority</TableCell>
                                      <TableCell>Due Date</TableCell>
                                      <TableCell>Actions</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {tasks.map((task) => (
                      <TableRow key={task._id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.status}</TableCell>
                          <TableCell>{task.priority}</TableCell>
                          <TableCell>{task.dueDate ? DateTime.fromISO(task.dueDate).toLocaleString(DateTime.DATE_SHORT) : 'N/A'}</TableCell>
                          <TableCell>
                              <IconButton onClick={() => handleOpenDialog(task)}>
                                  <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(task._id)}>
                                  <DeleteIcon />
                              </IconButton>
                          </TableCell>
                      </TableRow>
                  ))}
                              </TableBody>
                          </Table>

                          <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={totalCount} // Use totalCount for pagination
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                      </TableContainer>
                  </Paper>
              </Grid>
          </Grid>
      </LocalizationProvider>
  );
};

export default TaskManagement;

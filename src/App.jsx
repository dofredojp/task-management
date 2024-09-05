// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/Home';
import TaskManagement from './components/TaskMangement';
import ProfileSettings from './components/Profile';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/taskmgnt" element={<TaskManagement />} />
          <Route path="/profile" element={<ProfileSettings />} />
          {/* Other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;


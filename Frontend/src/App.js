import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminHomePage } from './components/AdminHomePage';
import { Homepage } from './components/HomePage';
import { StudentLoginPage } from './components/StudentLoginPage';
import { StudentHomePage } from './components/StudentHomePage';
import StudentRegisterPage from './components/StudentRegisterPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import LoginPage from './components/LoginPage';
import EmployerHomePage from './components/EmployerHomePage';
import ViewAllJobsPage from './components/ViewAllJobsPage';
import ViewPostedJobsPage from './components/ViewPostedJobsPage';
import StudentViewAllJobs from './components/StudentViewAllJobs';
import PostJobPage from './components/PostJobPage';
import StudentAppliedPage from './components/StudentAppliedPage';
import StudentProfile from './components/StudentProfile';
import AddEmployerPage from './components/AddEmployerPage'; // Corrected import path
import ViewAllEmployers from './components/ViewAllEmployers';
import AdminAddStudentPage from './components/AdminAddStudentPage';



import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/student-home" element={<StudentHomePage />} />
        <Route path="/student-register" element={<StudentRegisterPage />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/employer-login" element={<LoginPage />} />
        <Route path="/employer-home" element={<EmployerHomePage />} />
        <Route path="/view-all-jobs" element={<ViewAllJobsPage />} />
        <Route path="/view-posted-jobs" element={<ViewPostedJobsPage />} />
        <Route path="/Student-view-all-jobs" element={<StudentViewAllJobs />} />
        <Route path="/view-applied-jobs" element={<StudentAppliedPage />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/add-employer" element={<AddEmployerPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/view-all-employers" element={<ViewAllEmployers />} />
        <Route path="/admin-add-student" element={<AdminAddStudentPage />} /> {/* Added route */}
      </Routes>
    </Router>
  );
}

export default App;

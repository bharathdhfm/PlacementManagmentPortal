import React from 'react';
import { Link } from 'react-router-dom';
import './StudentHomePage.css';

export function StudentHomePage() {
  return (
    <div className="student-home">
      <div className="sidebar">
        <h2 className="logo">Job Portal</h2>
        <ul>
          <li><Link to="/Student-view-all-jobs">Jobs</Link></li>
          <li><Link to="/view-applied-jobs">Applied Jobs</Link></li>
          <li><Link to="/profile">My Profile</Link></li> {/* Updated link */}
          <li><Link to="/job-recommendations">Recommended Jobs</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <h2 className="header">Student Home Page</h2>
      </div>
    </div>
  );
}

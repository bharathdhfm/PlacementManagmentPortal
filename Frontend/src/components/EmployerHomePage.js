import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeHomePage = () => {
    return (
        <div className="container">
            <h2 className="my-4">Employee Home Page</h2>
            
            <h3>Welcome to the Job Portal</h3>
            
            <div className="my-4">
                <p>Click below to view job listings:</p>
                <ul>
                    <li>
                        <Link to="/view-all-jobs" className="btn btn-info">View All Jobs</Link>
                    </li>
                    <li>
                        <Link to="/view-posted-jobs" className="btn btn-info">View Jobs You Posted</Link>
                    </li>
                    <li>
                        <Link to="/post-job" className="btn btn-success">Post a Job</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EmployeeHomePage;

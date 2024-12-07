import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAppliedPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  // Dynamically fetch the student ID from localStorage or a global context
  const studentId = localStorage.getItem('studentId');  // Assuming studentId is saved in localStorage

  useEffect(() => {
    // If the studentId is not available, we can prevent API calls or show a message
    if (!studentId) {
      console.error('Student is not logged in!');
      return;
    }

    // Fetch applied jobs for the student from the backend
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:2003/student/appliedJobs?studentId=${studentId}`);
        setAppliedJobs(response.data);  // Assuming response.data is an array of applied jobs
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [studentId]);  // Re-run when studentId changes (e.g., after login)

  // Function to format the date if necessary (adjust based on the format you get from backend)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();  // Formats the date as MM/DD/YYYY
  };

  return (
    <div className="container">
      <h2>Jobs You Have Applied For</h2>
      {appliedJobs.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Description</th>
              <th>Skills</th>
              <th>Job Type</th>
              <th>Location</th>
              <th>Salary Range</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.jobTitle}</td>
                <td>{job.jobDescription}</td>
                <td>{job.requiredSkills}</td>
                <td>{job.jobType}</td>
                <td>{job.location}</td>
                <td>{job.salaryRange}</td>
                <td>{formatDate(job.appliedDate)}</td>  {/* Format applied date */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentAppliedPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const StudentViewAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track error
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch all jobs from the backend for students
    const fetchStudentJobs = async () => {
      try {
        const response = await axios.get('http://localhost:2003/student/jobs/all');
        setJobs(response.data); // Assuming response.data is an array of jobs
      } catch (error) {
        console.error('Error fetching student jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchStudentJobs();
  }, []);

  const handleApply = async (jobId) => {
    const studentId = localStorage.getItem('studentId'); // Dynamically fetch the student ID from localStorage

    if (!studentId) {
      // If the studentId is not found in localStorage, prompt the user to log in
      alert('You must be logged in to apply for jobs.');
      navigate('/login'); // Redirect the user to the login page if not logged in
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:2003/student/apply?studentId=${studentId}&jobId=${jobId}`
      );

      if (response.status === 200) {
        alert('Successfully applied for the job!');
        navigate('/view-applied-jobs'); // Redirect to the "view applied jobs" page
      } else {
        alert('Failed to apply for the job.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('An error occurred while applying for the job.');
    }
  };

  return (
    <div className="container">
      <h2>All Job Listings for Students</h2>
      
      {loading ? (
        <p>Loading jobs...</p> // Show loading message while fetching jobs
      ) : error ? (
        <p>{error}</p> // Show error message if there's an error
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p> // Show message if no jobs are available
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
              <th>Posted By</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.jobTitle}</td>
                <td>{job.jobDescription}</td>
                <td>{job.requiredSkills}</td>
                <td>{job.jobType}</td>
                <td>{job.location}</td>
                <td>{job.salaryRange}</td>
                <td>{job.postedBy}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApply(job.id)} // Apply button click handler
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentViewAllJobs;

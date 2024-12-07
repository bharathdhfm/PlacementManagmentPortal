import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllJobsPage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch all jobs from the backend
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get('http://localhost:2000/employer/jobs/all');
                setJobs(response.data); // Assuming response.data is an array of jobs
            } catch (error) {
                console.error('Error fetching all jobs:', error);
            }
        };
        fetchAllJobs();
    }, []);

    const deleteJob = async (jobId) => {
        try {
            const response = await axios.delete(`http://localhost:2001/admin/deletejob/${jobId}`);
            alert(response.data); // Display the server's response
            setJobs(jobs.filter((job) => job.id !== jobId)); // Remove deleted job from state
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Failed to delete job. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>All Job Listings</h2>
            {jobs.length === 0 ? (
                <p>No jobs available.</p>
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
                            <th>Actions</th> {/* Add Actions column */}
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
                                        className="btn btn-danger"
                                        onClick={() => deleteJob(job.id)}
                                    >
                                        Delete
                                    </button>
                                </td> {/* Add delete button */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewAllJobsPage;

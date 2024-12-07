import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPostedJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const employerEmail = localStorage.getItem('employerEmail'); // Get employer's email from localStorage

    useEffect(() => {
        // Fetch jobs posted by the employer
        const fetchPostedJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/employer/jobs?email=${employerEmail}`);
                setJobs(response.data); // Assuming response.data is an array of jobs
            } catch (error) {
                console.error('Error fetching posted jobs:', error);
            }
        };
        fetchPostedJobs();
    }, [employerEmail]);

    return (
        <div className="container">
            <h2>Jobs You Posted</h2>
            {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
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
                            <th>Posted By</th> {/* Add Posted By column */}
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
                                <td>{job.postedBy}</td> {/* Display Posted By */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewPostedJobsPage;

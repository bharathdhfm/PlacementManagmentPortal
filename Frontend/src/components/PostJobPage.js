import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [requiredSkills, setRequiredSkills] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const navigate = useNavigate();

    const employerEmail = localStorage.getItem('employerEmail'); // Get employer's email from localStorage
    const postedBy = employerEmail; // Set postedBy to employer's email or name

    // Handle posting the job
    const handlePostJob = async (e) => {
        e.preventDefault();
    
        const job = {
            jobTitle,
            jobDescription,
            requiredSkills,
            jobType,
            location,
            salaryRange,
            postedBy  // Add postedBy field
        };
    
        try {
            const response = await axios.post(
                `http://localhost:2004/employer/job?email=${employerEmail}`,
                job,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
    
            if (response.status === 200) {
                alert('Job posted successfully!');
                navigate('/view-posted-jobs');
            } else {
                alert('Failed to post job!');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job!');
        }
    };
    

    return (
        <div className="container">
            <h2>Post a New Job</h2>
            <form onSubmit={handlePostJob}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Job Description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Required Skills"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Job Type"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Salary Range"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Post Job</button>
                </div>
            </form>
        </div>
    );
};

export default PostJobPage;

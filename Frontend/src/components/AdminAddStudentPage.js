import React, { useState } from 'react';
import axios from 'axios'; // For making API requests

// Custom CSS for enhancing the form
import './AdminAddStudentPage.css';

export function AdminAddStudentPage() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    department: '',
    program: '',
    graduationStatus: '',
    cgpa: '',
    numberOfBacklogs: '',
    currentLocation: '',
    preferredJobLocation: '',
    skills: '',
    jobStatus: '',
    profilePhotoUrl: '',
    resumeUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2001/admin/addstudent', student);
      alert('Student added successfully');
      setStudent({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        department: '',
        program: '',
        graduationStatus: '',
        cgpa: '',
        numberOfBacklogs: '',
        currentLocation: '',
        preferredJobLocation: '',
        skills: '',
        jobStatus: '',
        profilePhotoUrl: '',
        resumeUrl: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  return (
    <div className="container add-student-form">
      <h3 className="text-center mb-4">Add New Student</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={student.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Program:</label>
            <input
              type="text"
              name="program"
              value={student.program}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Graduation Status:</label>
            <input
              type="text"
              name="graduationStatus"
              value={student.graduationStatus}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>CGPA:</label>
            <input
              type="number"
              step="0.1"
              name="cgpa"
              value={student.cgpa}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Number of Backlogs:</label>
            <input
              type="number"
              name="numberOfBacklogs"
              value={student.numberOfBacklogs}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Current Location:</label>
            <input
              type="text"
              name="currentLocation"
              value={student.currentLocation}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Preferred Job Location:</label>
            <input
              type="text"
              name="preferredJobLocation"
              value={student.preferredJobLocation}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={student.skills}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Job Status:</label>
            <input
              type="text"
              name="jobStatus"
              value={student.jobStatus}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Profile Photo URL (Optional):</label>
            <input
              type="url"
              name="profilePhotoUrl"
              value={student.profilePhotoUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Resume URL (Optional):</label>
            <input
              type="url"
              name="resumeUrl"
              value={student.resumeUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Add Student</button>
      </form>
    </div>
  );
}

export default AdminAddStudentPage;

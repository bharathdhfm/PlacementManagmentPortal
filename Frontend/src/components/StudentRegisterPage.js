import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGraduationCap, FaMapMarkerAlt, FaBook } from "react-icons/fa";

const StudentRegisterPage = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    program: "",
    graduationStatus: "",
    cgpa: "",
    numberOfBacklogs: "",
    currentLocation: "",
    preferredJobLocation: "",
    skills: "",
    jobStatus: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2003/student/register",
        student,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Student registered successfully!");
      setError("");
    } catch (error) {
      setError("Error registering student!");
      setMessage("");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
        <div className="card-header bg-primary text-white text-center">
          <h3>Student Registration</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={student.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                <FaLock /> Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={student.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">
                <FaPhone /> Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={student.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Department */}
            <div className="mb-3">
              <label className="form-label">
                <FaGraduationCap /> Department
              </label>
              <input
                type="text"
                name="department"
                className="form-control"
                value={student.department}
                onChange={handleChange}
                required
              />
            </div>

            {/* Program */}
            <div className="mb-3">
              <label className="form-label">
                <FaBook /> Program
              </label>
              <input
                type="text"
                name="program"
                className="form-control"
                value={student.program}
                onChange={handleChange}
                required
              />
            </div>

            {/* Graduation Status */}
            <div className="mb-3">
              <label className="form-label">Graduation Status</label>
              <input
                type="text"
                name="graduationStatus"
                className="form-control"
                value={student.graduationStatus}
                onChange={handleChange}
                required
              />
            </div>

            {/* CGPA */}
            <div className="mb-3">
              <label className="form-label">CGPA</label>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                className="form-control"
                value={student.cgpa}
                onChange={handleChange}
                required
              />
            </div>

            {/* Number of Backlogs */}
            <div className="mb-3">
              <label className="form-label">Number of Backlogs</label>
              <input
                type="number"
                name="numberOfBacklogs"
                className="form-control"
                value={student.numberOfBacklogs}
                onChange={handleChange}
                required
              />
            </div>

            {/* Current Location */}
            <div className="mb-3">
              <label className="form-label">
                <FaMapMarkerAlt /> Current Location
              </label>
              <input
                type="text"
                name="currentLocation"
                className="form-control"
                value={student.currentLocation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Preferred Job Location */}
            <div className="mb-3">
              <label className="form-label">Preferred Job Location</label>
              <input
                type="text"
                name="preferredJobLocation"
                className="form-control"
                value={student.preferredJobLocation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Skills */}
            <div className="mb-3">
              <label className="form-label">Skills</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                value={student.skills}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Status */}
            <div className="mb-3">
              <label className="form-label">Job Status</label>
              <input
                type="text"
                name="jobStatus"
                className="form-control"
                value={student.jobStatus}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <a href="/student-login">Sign In</a>
          </p>
          {message && <p className="mt-3 text-success">{message}</p>}
          {error && <p className="mt-3 text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterPage;
  
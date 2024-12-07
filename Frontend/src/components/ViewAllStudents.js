import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllStudents.css'; // Custom CSS file for styling

export function ViewAllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:2000/admin/viewallstudents', {
          params: { username: 'admin' },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    if (window.confirm(`Are you sure you want to delete the student with ID ${id}?`)) {
      try {
        await axios.delete(`http://localhost:2001/admin/deletestudent/${id}`);
        setStudents(students.filter((student) => student.id !== id));
        alert('Student deleted successfully.');
      } catch (error) {
        alert('Failed to delete student. Please try again.');
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="view-students-container">
      <h2 className="text-center mb-4">List of Students</h2>
      {students.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Department</th>
                <th>Program</th>
                <th>CGPA</th>
                <th>Graduation Status</th>
                <th>Number of Backlogs</th>
                <th>Current Location</th>
                <th>Preferred Job Location</th>
                <th>Skills</th>
                <th>Job Status</th>
                <th>Profile Photo</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.department}</td>
                  <td>{student.program}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.graduationStatus}</td>
                  <td>{student.numberOfBacklogs}</td>
                  <td>{student.currentLocation}</td>
                  <td>{student.preferredJobLocation}</td>
                  <td>{student.skills}</td>
                  <td>{student.jobStatus}</td>
                  <td>
                    {student.profilePhotoUrl ? (
                      <img
                        src={`http://localhost:2003/uploads/${student.profilePhotoUrl}`}
                        alt="Profile"
                        width="50"
                        height="50"
                      />
                    ) : (
                      'No photo available'
                    )}
                  </td>
                  <td>
                    {student.resumeUrl ? (
                      <a
                        href={`http://localhost:2003/uploads/resumes/${student.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Resume
                      </a>
                    ) : (
                      'No resume available'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No students found.
        </div>
      )}
    </div>
  );
}

export default ViewAllStudents;

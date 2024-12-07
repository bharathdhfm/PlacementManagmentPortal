import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewAllEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all employers from the backend API
    const fetchEmployers = async () => {
      try {
        const response = await axios.get('http://localhost:2000/admin/viewallemployers');
        setEmployers(response.data);
      } catch (err) {
        setError('Failed to fetch employers');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  // Delete employer handler
  const deleteEmployer = async (id) => {
    if (window.confirm(`Are you sure you want to delete employer with ID ${id}?`)) {
      try {
        await axios.delete(`http://localhost:2001/admin/deleteemployee/${id}`);
        // Remove deleted employer from the list
        setEmployers(employers.filter((employer) => employer.id !== id));
        alert('Employer deleted successfully');
      } catch (err) {
        alert('Failed to delete employer');
      }
    }
  };

  return (
    <div className="container">
      <h2>All Employers</h2>

      {loading ? (
        <p>Loading employers...</p> // Show loading message while fetching employers
      ) : error ? (
        <p>{error}</p> // Show error message if there's an error
      ) : employers.length === 0 ? (
        <p>No employers available.</p> // Show message if no employers are available
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Employer Name</th>
              <th>Email</th>
              <th>Industry Type</th>
              <th>Actions</th> {/* Added a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {employers.map((employer, index) => (
              <tr key={index}>
                <td>{employer.companyName}</td>
                <td>{employer.employerName}</td>
                <td>{employer.email}</td>
                <td>{employer.industryType}</td>
                <td>
                  {/* Add Delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmployer(employer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAllEmployers;

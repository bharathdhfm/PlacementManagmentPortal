import React, { useState } from 'react';
import axios from 'axios';

function AddEmployerPage() {
  const [employerData, setEmployerData] = useState({
   
    employerName: '',
    password: '',
    companyName: '',
    companyOverview: '',
    contactNumber: '',
    email: '',
    industryType: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployerData({ ...employerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2001/admin/addemployer', employerData);
      alert('Employer added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employer:', error);
      alert('Failed to add employer.');
    }
  };

  return (
    <div>
      <h2>Add Employer</h2>
      <form onSubmit={handleSubmit}>
     
        <div>
          <label>Employer Name:</label>
          <input type="text" name="employerName" value={employerData.employerName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employerData.email} onChange={handleChange} required />
        </div>
        <div></div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={employerData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" name="companyName" value={employerData.companyName} onChange={handleChange} required />
        </div>
        <div>
          <label>Company Overview:</label>
          <textarea name="companyOverview" value={employerData.companyOverview} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" name="contactNumber" value={employerData.contactNumber} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Industry Type:</label>
          <input type="text" name="industryType" value={employerData.industryType} onChange={handleChange} required />
        </div>
       
        <button type="submit">Add Employer</button>
      </form>
    </div>
  );
}

export default AddEmployerPage;

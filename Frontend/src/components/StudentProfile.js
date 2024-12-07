import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

export function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null); // For handling image upload
  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const [resumeFile, setResumeFile] = useState(null); // For handling resume upload
  const [resumePreview, setResumePreview] = useState(null); // For resume preview
  const navigate = useNavigate();

  // Fetch profile data
  const fetchProfile = async () => {
    const email = localStorage.getItem('email');

    if (!email) {
      setMessage('No email found. Please log in again.');
      navigate('/student-login'); // Redirect to login if email is not found
      return;
    }

    try {
      const response = await axios.get('http://localhost:2003/student/profile', {
        params: { email }, // Pass email as a query parameter
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { profile } = response.data;
      setProfile(profile);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        setMessage('An error occurred while fetching the profile.');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Create a temporary URL to show a preview of the image
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleImageUpload = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      setMessage('No email found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      await axios.post(`http://localhost:2003/student/${email}/uploadProfilePhoto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Profile image uploaded successfully!');
      fetchProfile(); // Fetch updated profile after image upload
      setPreviewImage(null); // Reset the preview image after upload
    } catch (error) {
      setMessage('An error occurred while uploading the profile image.');
    }
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
    setResumePreview(file.name); // Preview the file name
  };

  const handleResumeUpload = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      setMessage('No email found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('file', resumeFile);

    try {
      await axios.post(`http://localhost:2003/student/uploadResume/${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Resume uploaded successfully!');
      fetchProfile(); // Fetch updated profile after resume upload
      setResumePreview(null); // Reset the resume preview after upload
    } catch (error) {
      setMessage('An error occurred while uploading the resume.');
    }
  };

  const renderField = (label, value) => (
    <p>
      <strong>{label}:</strong> {value || 'Data not available'}
    </p>
  );

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      {message && <p>{message}</p>}

      {profile ? (
        <div className="profile-details">
          {/* Display profile image */}
          <div className="profile-image">
            {profile.profilePhotoUrl ? (
              <img
                src={`http://localhost:2003/uploads/${profile.profilePhotoUrl}`}
                alt="Profile"
                width="100"
                height="100"
              />
            ) : (
              <p>No profile image available.</p>
            )}
          </div>

          {/* Image upload and preview */}
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <div>
                <img src={previewImage} alt="Preview" width="100" height="100" />
              </div>
            )}
            <button onClick={handleImageUpload}>Update Profile Photo</button>
          </div>

          {/* Render other profile fields */}
          {renderField('Name', profile.name)}
          {renderField('Email', profile.email)}
          {renderField('Phone Number', profile.phoneNumber)}
          {renderField('Department', profile.department)}
          {renderField('Program', profile.program)}
          {renderField('Graduation Status', profile.graduationStatus)}
          {renderField('CGPA', profile.cgpa)}
          {renderField('Number of Backlogs', profile.numberOfBacklogs)}
          {renderField('Current Location', profile.currentLocation)}
          {renderField('Preferred Job Location', profile.preferredJobLocation)}
          {renderField('Skills', profile.skills)}
          {renderField('Job Status', profile.jobStatus)}

          {/* Resume Upload */}
          <div className="resume-upload">
            {profile && profile.resumeUrl ? (
              <div>
                <p>Resume: <a href={`http://localhost:2003/uploads/resumes/${profile.resumeUrl}`} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
              </div>
            ) : (
              <p>No resume available.</p>
            )}
            <input type="file" accept=".pdf" onChange={handleResumeChange} />
            {resumePreview && <div><p>Preview: {resumePreview}</p></div>}
            <button onClick={handleResumeUpload}>Upload Resume</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StudentProfile;

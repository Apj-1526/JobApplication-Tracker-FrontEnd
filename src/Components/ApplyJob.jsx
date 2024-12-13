import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ApplyJob() {
  const { jobId } = useParams(); // Get the jobId from the route parameters
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [isApplied,setIsApplied] = useState(false)
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) {
      console.error("Job ID is missing.");
      alert("Invalid job ID");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await axios.post(`http://localhost:5000/api/user/apply/${jobId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true // Ensure cookies/session are sent
      });

      console.log('Application submitted:', response);
      alert('Application submitted successfully!');
	  navigate('/')
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('There was an error submitting your application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isApplied} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isApplied} />
      <input type="file" onChange={handleFileChange} disabled={isApplied} accept='.pdf' />


      <button type="submit" disabled={isApplied}>

        {isApplied ? 'Applied' : 'Apply'}
      </button>
    </form>
  );
}

export default ApplyJob;

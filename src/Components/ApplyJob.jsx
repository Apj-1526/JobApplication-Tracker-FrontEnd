import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ApplyJob() {
  const { jobId } = useParams(); // Get the jobId from the route parameters
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) {
      console.error('Job ID is missing.');
      alert('Invalid job ID');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await axios.post(`http://localhost:5000/api/user/apply/${jobId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // Ensure cookies/session are sent
      });

      console.log('Application submitted:', response);
      setIsApplied(true);
      alert('Application submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('There was an error submitting your application.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Apply for the Job</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isApplied}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isApplied}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume (PDF Only)
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              disabled={isApplied}
              accept=".pdf"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isApplied}
            className={`w-full py-3 text-white font-bold rounded-lg transition-all duration-300 ${
              isApplied
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;

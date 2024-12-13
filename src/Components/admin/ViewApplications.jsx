import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ViewApplications.css'; 

function ViewApplications() {
  const [application, setApplication] = useState([]);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/applications', {
          withCredentials: true,
        });
        setApplication(response.data);
      } catch (error) {
        console.error('Error in fetching application details', error);
      }
    };
    fetchApplication();
  }, []);

  return (
    <div className="application-container">
      <h1 className="application-title">Job Applications</h1>

      {application.length === 0 ? (
        <p className="no-application-message">No Application Found</p>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {application.map((application) => (
              <tr key={application._id}>
                <td>{application.jobId?.title || 'N/A'}</td>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>
                  <a 
                    href={`http://localhost:5000/${application.resume}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-resume-link"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewApplications;

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



function UserHome() {
	const {jobId} = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/jobs');
				console.log('API Response:', response.data);
                setJobs(response.data);
                setLoading(false);
            } catch(err) {
                console.error("Error in fetching jobs", err);
                setError("Failed to load jobs. Please try again later.");
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className="text-center my-5">Available Jobs</h1>

            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : jobs.length > 0 ? (
                <div className="container">
                    <div className="row">
                        {jobs.map((job) => (
                            <div key={job._id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{job.title}</h5>
                                        <p><strong>Company:</strong> {job.company}</p>
                                        <p><strong>Location:</strong> {job.location}</p>
                                        <p><strong>Salary:</strong> ${job.salary}</p>
                                    </div>
                                    <div className="card-footer">

									<Link to={`/apply-job/${job._id}`}>Apply</Link>

        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No jobs available</p>
            )}
        </div>
    );
}

export default UserHome;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DisplayJobs() {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/admin/jobs');
				setJobs(response.data);
				setLoading(false);
			} catch (err) {
				console.error(err);
				setLoading(false);
			}
		};
		fetchJobs();
	}, []);

	const handleDelete = async(id)=>{
			if(window.confirm('Do you want to delete this job ?'));
			try {
				await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`);
				alert("deleted Successfully!!");
				setJobs(jobs.filter((job)=>job._id !== id))
			}catch(err){
				console.error("error in deleting job",err);
				alert('failed to delete the job')				
			}
	}

	if (loading) {
		return <p>Loading Jobs....</p>;
	}

	return (
		<div className="container">
			<div className="row mt-5">
				<h1 className="text-center mb-4">Posted Jobs</h1>
				<div className="col-md-10 mx-auto">
					<table className="table table-striped table-bordered table-hover">
						<thead className="thead-dark">
							<tr>
								<th>Job Title</th>
								<th>Company</th>
								<th>Role</th>
								<th>Location</th>
								<th>Description</th>
								<th>Salary</th>
							</tr>
						</thead>
						<tbody>
							{jobs.map((job) => (
								<tr key={job._id}>
									<td>{job.title}</td>
									<td>{job.companyName}</td>
									<td>{job.role}</td>
									<td>{job.location}</td>
									<td>{job.description}</td>
									<td>{job.salary}</td>
									<td className='flex justify-between'>
										<a href={`/editjob/${job._id}`}>
											<button className='btn btn-success'>Edit</button>
										</a>


										<a href=""><button onClick={()=>handleDelete(job._id)} className='btn btn-danger'>Delete</button></a>
										
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

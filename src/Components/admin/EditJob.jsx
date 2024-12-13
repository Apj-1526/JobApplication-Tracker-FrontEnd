import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {  useNavigate, useParams } from 'react-router-dom'

function EditJob() {

	const {id} = useParams()
	const navigate = useNavigate();

	const [job, setJob] = useState({
		title: '',
		companyName: '',
		role: '',
		location: '',
		description: '',
		salary: ''
	  });

	  useEffect(()=>{
		const fetchJobData = async ()=>{
			try{
				const response = await axios.get(`http://localhost:5000/api/admin/jobs/${id}`);
				setJob(response.data);
				console.log(response.data)
			}catch(err){
				console.error(err);
				
			}
		};
		if (id) fetchJobData();
	  },[id])

	  const handleChange=(e)=>{
		const {name,value} = e.target
		setJob((prevJob)=>({
			...prevJob,
			[name]:value
		}));
	  }
	  const handleSubmit = async(e)=>{
		e.preventDefault()
		try{
			const response = await axios.put(`http://localhost:5000/api/admin/jobs/${id}`, job);
			alert("Job updated Successfully!!");
			navigate('/admin');
			console.log(response.data)
		}catch (error) {
			console.error('Error updating job:', error);
			alert('Error updating job');
		  }
	  }
  return (
	<div className="container">
	<div className="row mt-5">
	  <div className="col-md-6">
		<h2 className="text-center">Edit Job</h2>
		<form onSubmit={handleSubmit} method="post" className="mt-4 gap-5">
		  <label>Job Title</label>
		  <input
			type="text"
			name="title"
			className="form-control"
			placeholder="Enter Job title"
			value={job.title}
			onChange={handleChange}
			required
		  />
		  <label>Company Name</label>
		  <input
			type="text"
			name="companyName"
			className="form-control"
			placeholder="Enter the Company name"
			value={job.companyName}
			onChange={handleChange}
			required
		  />
		  <label>Job Role</label>
		  <input
			type="text"
			name="role"
			className="form-control"
			placeholder="Enter the Role"
			value={job.role}
			onChange={handleChange}
		  />
		  <label>Company Location</label>
		  <input
			type="text"
			name="location"
			className="form-control"
			placeholder="Enter the location"
			value={job.location}
			onChange={handleChange}
		  />
		  <label>Description</label>
		  <input
			type="text"
			name="description"
			className="form-control"
			placeholder="Job Description"
			value={job.description}
			onChange={handleChange}
		  />
		  <label>Salary</label>
		  <input
			type="number"
			name="salary"
			className="form-control"
			placeholder="Salary"
			value={job.salary}
			onChange={handleChange}
		  />
		  <button type="submit" className="btn btn-success mt-3">Update Job</button>
		</form>
	  </div>
	</div>
  </div>
  )
}

export default EditJob

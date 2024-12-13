import axios from 'axios';
import React, { useState } from 'react'
import { redirect } from 'react-router-dom';

function AddJob() {
	const [title,setTitle] = useState('');
	const [companyName,setCompanyName] = useState('');
	const [role,setJobRole] = useState('');
	const [location,setLocation] = useState('');
	const [description,setDescription] = useState('');
	const [salary,setSalary] = useState('');
	
	const handleSubmit = async(e)=>{
		e.preventDefault();
		const jobData = {title,companyName,role,location,description,salary};
		
		try{
			const response = await axios.post('http://localhost:5000/api/admin/jobs', jobData);
			console.log(response.data);
			alert("posted successfully");
			setTitle('');
			setCompanyName('');
			setJobRole('');
			setLocation('');
			setDescription('');
			setSalary('');
			window.location.href = '/admin';

		}catch(err) {
			console.error("Error while posting",err);

		}
	};
  return (
	<div className='container'>
		<div className="row mt-5">
			<div className="col-md-6">
				<h2 className='text-center'>Post Jobs</h2>
				<form onSubmit={handleSubmit} method="post" className='mt-4 gap-5'>
				<label for="">Job title</label>
				<input type="text" name="jobtitle" className="form-control" placeholder='Enter Job title' value={title} onChange={(e)=>
					setTitle(e.target.value)
				} required/>
				<label for="">Company Name</label>
				<input type="text" name="CompanyName" className="form-control" placeholder='Enter the Company name' value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required/>
				<label for="">Job Role</label>
				<input type="text" name="role" className="form-control" placeholder='Enter the Role' value={role} onChange={(e)=>setJobRole(e.target.value)}/>
				<label for="">Company Location</label>
				<input type="text" name="location" className="form-control" placeholder='Enter the location' value={location} onChange={(e)=>setLocation(e.target.value)} />
				<label for="">Description</label>
				<input type="text" name="Description" className="form-control" placeholder='Job Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
				<label for="">Salary</label>
				<input type="number" name='Salary' className='form-control'placeholder='salary' value={salary} onChange={(e)=>setSalary(e.target.value)} />
				<button type="submit" className="btn btn-success mt-3">Post</button>
			</form>
			</div>
		</div>
	  
	</div>
  )
}

export default AddJob

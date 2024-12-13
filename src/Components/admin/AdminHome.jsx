import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import DisplayJobs from './DisplayJobs';
import { Link, useNavigate } from 'react-router-dom';


export default function AdminHome() {
	const [userName,setUserName]=useState('');
	const [userRole,setUserRole]=useState('');
	const navigate = useNavigate();

	useEffect(()=>{
		const name = sessionStorage.getItem('username')
		const role = sessionStorage.getItem('userRole')
		setUserName(name)
		setUserRole(role)
	},[])

	const handleLogout= () =>{
		sessionStorage.clear();
		navigate('/login');
	}
  return (
	<>
    <header className='bg-light'>
     <Navbar>
		<div className="container justify-center">
		<h1>Welcome {userRole}</h1>
		<div className='dflex'>
		<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="/add-jobs">Add Jobs </a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/view-jobs">Posted Jobs</a>
						</li>
					<li className="nav-item">
							<Link className="nav-link" to={'/applications'}>Applications</Link>
						</li>
						<li className='nav-item'>
						{userRole ? (
										<>
											
											<button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded-md'>Logout</button>
										</>
									) : (
										<button className='bg-green-500 rounded-md'>
											<a className="nav-link" href="/login">Login</a> 
										</button>
									)}
							
							 </li>
					</ul>
					
		</div>
		</div>
	 </Navbar>
    </header>
	<div>
		<DisplayJobs/>
	</div>
	</>
  );
}

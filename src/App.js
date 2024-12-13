import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import UserHome from './Components/home/UserHome'
import AddJob from './Components/admin/AddJob';
import AdminHome from './Components/admin/AdminHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayJobs from './Components/admin/DisplayJobs';
import Login from './Components/Logins/Login';
import SignUp from './Components/Logins/SignUp';
import EditJob from './Components/admin/EditJob';
import ApplyJob from './Components/ApplyJob';
import ViewApplications from './Components/admin/ViewApplications';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserHome/>}  />
        <Route path='/signin' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<AdminHome/>}  />
        <Route path='/add-jobs' element={<AddJob/>} />
        <Route path='/view-jobs' element={<DisplayJobs/>} />
        <Route path="/editjob/:id" element={<EditJob />} />
        <Route path="/apply-job/:jobId" element={<ApplyJob/>} />
        <Route path='/applications' element={<ViewApplications/>} />


      </Routes>
    </Router>
  
  )
}

export default App

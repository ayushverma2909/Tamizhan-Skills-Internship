import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './Pages/Dashboard'
import SideNav from './components/SideNav'
import StudentInformation from './Pages/StudentInformation';
import AddStudents from './components/Student Information/AddStudents';
import StudentCard from './components/Student Information/StudentCard'

function App() {

  return (
    <>
    <div className='flex h-screen'>
      <BrowserRouter>
        <SideNav />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/students/addStudents' element={<AddStudents />} />
            <Route path='students/*' element={<StudentInformation />} />
            <Route path="/student/:regno" element={<StudentCard />} />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App

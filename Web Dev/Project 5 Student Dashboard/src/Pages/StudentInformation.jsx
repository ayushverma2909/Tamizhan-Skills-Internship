import React, { useState } from 'react'
import { Routes, Route } from "react-router";
import StudentTable from '../components/Student Information/ViewStudents';
import AddStudents from '../components/Student Information/AddStudents'
import Navigation from '../components/Student Information/Navigation';
import TopNav from '../components/TopNav'
import StudentCount from '../components/Dashboard/StudentCount'

const StudentInformation = () => {




    return (
        <>
        <div className='bg-gray-800 h-screen overflow-auto text-white'>
            
            <TopNav />
            <div className='p-4'>
                <StudentCount />
                <Navigation />
                <StudentTable />
            </div>
            
        </div>
            
        </>
    )
}

export default StudentInformation

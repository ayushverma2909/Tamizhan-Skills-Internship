import React from 'react'
import TopNav from '../components/TopNav'
import StudentCount from '../components/Dashboard/StudentCount'
import TotalAttendence from '../components/Dashboard/TotalAttendence'
import StudentByClasses from '../components/Dashboard/StudentByClasses'
import StudentData from '../components/Dashboard/StudentData'
import StudentGender from '../components/Dashboard/StudentGender'

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-800 text-white min-h-screen">
      <TopNav />
      <main className='p-4 space-y-6'>

        {/* Top Summary Cards */}
        <StudentCount />

        {/* Grid for charts & analytics */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <TotalAttendence />
          <StudentByClasses />
          <StudentData />
          <StudentGender />
        </div>
        
      </main>
    </div>
  )
}

export default Dashboard

import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { useStudents } from '../StudentContext'

const StudentGender = () => {
  const {students} = useStudents()
  const maleCount = students.filter(s => s.Gender === 'Male').length
  const femaleCount = students.filter(s => s.Gender === 'Female').length
  const total = maleCount + femaleCount

  const data = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount },
  ]

  const COLORS = ['#ff4d4f', '#facc15'] 

  return (
    <div className=" w-[92%] bg-gray-600 mt-8 ml-8 rounded">
      <h2 className="text-xl my-4 font-semibold text-center">Gender Distribution</h2>
      <div className='text-center ml-10'>
        <PieChart  width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
      
    </div>
  )
}

export default StudentGender

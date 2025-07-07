import React from 'react'
import { MdCoPresent } from "react-icons/md"
import { PiStudent } from "react-icons/pi"
import { HiMiniUserGroup } from "react-icons/hi2"
import { useStudents } from '../StudentContext'

const StudentCount = () => {
  const { students } = useStudents()

  const data = [
    {
      icons: <PiStudent className='w-10 h-10 text-white' />,
      name: "Today's Absent",
      count: 0
    },
    {
      icons: <MdCoPresent className='w-10 h-10 text-white' />,
      name: "Today's Present",
      count: 0
    },
    {
      icons: <HiMiniUserGroup className='w-10 h-10 text-white' />,
      name: "Total Student",
      count: students.length
    },
  ]

  return (
    <div className='w-full px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data.map((items, index) => (
        <div key={index} className='relative bg-gray-600 hover:bg-gray-500 rounded-lg p-4 flex items-center gap-4'>
          <div className='absolute top-2 right-3 text-white text-xl cursor-pointer'>...</div>

          <div className='flex-shrink-0'>
            {items.icons}
          </div>

          <div className='flex-1'>
            <p className='text-white text-base sm:text-lg font-medium'>{items.name}</p>
            <p className='text-gray-300 text-sm sm:text-base'>{items.count}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudentCount

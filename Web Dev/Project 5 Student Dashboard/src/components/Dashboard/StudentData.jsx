import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudents } from '../StudentContext'

const toRoman = (num) => {
  const map = [
    [10, 'X'], [9, 'IX'], [8, 'VIII'], [7, 'VII'], [6, 'VI'],
    [5, 'V'], [4, 'IV'], [3, 'III'], [2, 'II'], [1, 'I']
  ];
  let result = '';
  for (let [val, roman] of map) {
    while (num >= val) {
      result += roman;
      num -= val;
    }
  }
  return result;
};

const StudentData = () => {
  const navigate = useNavigate();
  let { students } = useStudents();
  students = students
    .sort((a, b) => b.TotalMarksPercentage - a.TotalMarksPercentage)
    .slice(0, 5);

  return (
    <div className='bg-gray-600 mt-8 col-span-2 w-[98%] rounded p-5'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold text-white'>Top Academic Results</h1>
      </div>

      <div className='w-full h-[320px] overflow-auto'>
        <table className='w-full text-left'>
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Reg. No</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Mark Sheet</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student["Reg.no"]} className="border-b hover:bg-gray-700 transition">
                <td className="px-4 py-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className='rounded-full w-8 h-8 object-cover'
                  />
                </td>
                <td className="px-4 py-2 text-white">{student.name}</td>
                <td className="px-4 py-2 text-white">{student["Reg.no"].toString().slice(0, 5)}...</td>
                <td className="px-4 py-2 text-white">{toRoman(student.Class)}</td>
                <td className="px-4 py-2 text-white">{student.TotalMarksPercentage}%</td>
                <td className="px-4 py-2">
                  <button
                    className='bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded cursor-pointer'
                    onClick={() => navigate("/students/addStudents", { state: student })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-end mt-3'>
          <button
            className='hover:text-blue-400 text-sm underline text-white cursor-pointer'
            onClick={() => navigate("/students")}
          >
            View more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentData;

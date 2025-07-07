import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudents } from '../StudentContext';
import { FaArrowLeft } from 'react-icons/fa';

const StudentCard = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="text-white text-center py-20">
        <p className="text-xl">Student not found</p>
        <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-12">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Student Profile</h2>
          <FaArrowLeft onClick={() => navigate(-1)} className="text-xl cursor-pointer hover:text-gray-400" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center md:justify-start">
            <img
              src={student.photo || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-lg font-semibold">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Reg. No</p>
              <p className="text-lg font-semibold">{student["Reg.no"]}</p>
            </div>
            <div>
              <p className="text-gray-400">Year</p>
              <p className="text-lg font-semibold">{student.Year}</p>
            </div>
            <div>
              <p className="text-gray-400">Class</p>
              <p className="text-lg font-semibold">{student.Class}</p>
            </div>
            <div>
              <p className="text-gray-400">Department</p>
              <p className="text-lg font-semibold">{student.Department}</p>
            </div>
            <div>
              <p className="text-gray-400">Gender</p>
              <p className="text-lg font-semibold">{student.Gender}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Subject-wise Marks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {student.Marks &&
              Object.entries(student.Marks).map(([subject, mark]) => (
                <div key={subject} className="bg-gray-700 p-4 rounded shadow">
                  <p className="text-gray-300">{subject}</p>
                  <p className="text-lg font-medium">{mark}/100</p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold">Total Percentage: <span className="text-green-400">{student.TotalMarksPercentage}%</span></p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

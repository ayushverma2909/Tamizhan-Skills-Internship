import React, { useState } from 'react';
import { useStudents } from '../StudentContext';
import { useNavigate } from 'react-router-dom';

const StudentTable = () => {
  const { students, deleteStudent } = useStudents();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const filtered = (students || []).filter((s) =>
    (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
    s["Reg.no"]?.toString().includes(search)
  );


  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / studentsPerPage);

  return (
    <div className="w-full mt-6 px-4">
      <input
        type="text"
        placeholder="Search by name, Reg. No or department"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 w-full md:w-1/2 rounded bg-gray-700 text-white outline-none"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left bg-gray-800 text-white rounded">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Reg. No</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Percentage</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student["Reg.no"]} className="border-b hover:bg-gray-700 transition">
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student["Reg.no"]}</td>
                <td className="px-4 py-2 border">{student.Class}</td>
                <td className="px-4 py-2 border">{student.Gender}</td>
                <td className="px-4 py-2 border">{student.TotalMarksPercentage}%</td>
                <td
                  className="px-4 py-2 border flex flex-wrap justify-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded cursor-pointer"
                    onClick={() => navigate("/students/addStudents", { state: student })}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded cursor-pointer"
                    onClick={() => deleteStudent(student["Reg.no"])}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded cursor-pointer"
                    onClick={() => navigate(`/student/${student["Reg.no"]}`)}
                  >
                    View More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded ${
                currentPage === num ? 'bg-indigo-500' : 'bg-gray-600'
              } text-white text-sm`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTable;

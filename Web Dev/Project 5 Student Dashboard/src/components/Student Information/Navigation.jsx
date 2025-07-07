import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="p-4">
      <Link
        to="/students/addStudents"
        className="inline-block bg-indigo-600 text-white font-medium px-5 py-2 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
      >
        + Add Student
      </Link>
    </div>
  );
};

export default Navigation;

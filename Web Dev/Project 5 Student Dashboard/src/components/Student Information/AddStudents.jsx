import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../StudentContext';
import TopNav from '../TopNav';
import StudentCount from '../Dashboard/StudentCount';
import { v4 as uuidv4 } from 'uuid';

const AddStudents = () => {
  
  const location = useLocation();
  const editingStudent = location.state;
  const { addStudent, updateStudent } = useStudents();
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(!!editingStudent);
  const [editRegNo, setEditRegNo] = useState(editingStudent?.["Reg.no"] || null);


  const [formData, setFormData] = useState(editingStudent || {
    name: '',
    'Reg.no': uuidv4(),
    Year: '',
    // Department: '',
    Gender: '',
    Class: '',
    Marks: {
      Hindi: '',
      English: '',
      Maths: '',
      Science: '',
      SocialScience: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (['Hindi', 'English', 'Maths', 'Science', 'SocialScience'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        Marks: {
          ...prev.Marks,
          [name]: parseInt(value) || ''
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "Reg.no" || name === "Class" || name === "Year" ? parseInt(value) || '' : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.Gender || !formData.Class) {
      alert("Please fill all required fields.");
      return;
    }

  
    const marks = formData.Marks;
    const totalSubjects = Object.keys(marks).length;
    const totalScored = Object.values(marks).reduce((a, b) => a + Number(b), 0);
    const percentage = (totalScored / (totalSubjects * 100)) * 100;

    const updatedFormData = {
      ...formData,
      TotalMarksPercentage: parseFloat(percentage.toFixed(2)),
    };

    if (isEditing) {
      updateStudent(editRegNo, updatedFormData);
    } else {
      addStudent(updatedFormData);
    }

    setFormData({
      name: '',
      'Reg.no': '',
      Year: '',
      // Department: '',
      Gender: '',
      Class: '',
      Marks: {
        Hindi: '',
        English: '',
        Maths: '',
        Science: '',
        SocialScience: ''
      }
    });
    setIsEditing(false);
    setEditRegNo(null);
    navigate("/students");
  };


  return (
    <div className=' bg-gray-800 text-white'>
      <TopNav />
      <div className='p-4'>
        <StudentCount />
      </div>
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center px-4 py-8">
        
        <div className="w-full max-w-4xl bg-gray-700 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="Reg.no"
              placeholder="Registration Number"
              value={formData["Reg.no"]}
              readOnly
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="Year"
              placeholder="Year (e.g., 2025)"
              value={formData.Year}
              onChange={handleChange}
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {/* <input
              type="text"
              name="Department"
              placeholder="Department"
              value={formData.Department}
              onChange={handleChange}
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            /> */}
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              name="Class"
              placeholder="Class (e.g., 5)"
              value={formData.Class}
              onChange={handleChange}
              className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />


            {Object.keys(formData.Marks).map((subject) => (
              <input
                key={subject}
                name={subject}
                placeholder={`${subject} Marks`}
                value={formData.Marks[subject]}
                onChange={handleChange}
                className="p-3 rounded bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition duration-200"
              >
                {isEditing ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;

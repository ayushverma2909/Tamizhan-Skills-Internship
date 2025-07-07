import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const calculatePercentage = (marks) => {
    const subjects = Object.values(marks);
    const total = subjects.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / (subjects.length * 100)) * 100;
    return percentage.toFixed(2); 
  };

  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem("studentData");
    return stored ? JSON.parse(stored) : [
      {
        name: "Aarush",
        "Reg.no": 101,
        Year: 2025,
        // Department: "Science",
        Gender: "Male",
        Class: 5,
        Marks: {
          Hindi: 88,
          English: 90,
          Maths: 85,
          Science: 92,
          SocialScience: 87,
        },
        TotalMarksPercentage: 88.4,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("studentData", JSON.stringify(students));
  }, [students]);

  const addStudent = (newStudent) => {
    const percent = calculatePercentage(newStudent.Marks);
    const studentWithPercent = {
      ...newStudent,
      TotalMarksPercentage: parseFloat(percent),
    };
    setStudents((prev) => [...prev, studentWithPercent]);
  };

  
  const deleteStudent = (regNo) => {
    setStudents((prev) => prev.filter((s) => s["Reg.no"] !== regNo));
  };


  const updateStudent = (regNo, updatedData) => {
    const percent = calculatePercentage(updatedData.Marks);
    const updatedWithPercent = {
      ...updatedData,
      TotalMarksPercentage: parseFloat(percent),
    };

    setStudents((prev) =>
      prev.map((s) =>
        s["Reg.no"] === regNo ? { ...s, ...updatedWithPercent } : s
      )
    );
  };


  return (
    <StudentContext.Provider
      value={{ students, addStudent, deleteStudent, updateStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);

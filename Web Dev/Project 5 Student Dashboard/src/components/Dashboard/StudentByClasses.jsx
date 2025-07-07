import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useStudents } from '../StudentContext';

const toRoman = (num) => {
  const map = [
    { val: 10, sym: 'X' }, { val: 9, sym: 'IX' }, { val: 8, sym: 'VIII' },
    { val: 7, sym: 'VII' }, { val: 6, sym: 'VI' }, { val: 5, sym: 'V' },
    { val: 4, sym: 'IV' }, { val: 3, sym: 'III' }, { val: 2, sym: 'II' }, { val: 1, sym: 'I' }
  ];
  const found = map.find(m => m.val === num);
  return found ? found.sym : num.toString();
};

const StudentByClasses = () => {
  const { students } = useStudents();

  const classCountMap = {};

  students.forEach(student => {
    const romanClass = toRoman(student.Class);
    classCountMap[romanClass] = (classCountMap[romanClass] || 0) + 1;
  });

  const chartData = Object.keys(classCountMap).map(className => ({
    name: className,
    total: classCountMap[className]
  }));

  return (
    <div className='w-[92%] bg-gray-600 mt-8 ml-8 rounded'>
      <div className='p-4'>
        <h1>Students by Classes</h1>
      </div>
      <div className='w-[100%] h-[300px] ml-[-15px]'>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis allowDecimals={false} stroke='#fff'/>
            <Tooltip
              contentStyle={{ backgroundColor: '#2d2d2d', border: 'none', borderRadius: '8px', color: 'white' }}
              labelStyle={{ color: '#aaa' } }
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="total" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentByClasses;

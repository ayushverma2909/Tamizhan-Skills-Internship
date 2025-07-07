import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip, ResponsiveContainer } from 'recharts';


const TotalAttendence = () => {
    const generateAttendanceData = () => {
        const result = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = date.toLocaleDateString('en-GB');

            const present = Math.floor(Math.random() * 50 + 50);
            const absent = 150 - present;

            result.push({
                date: formattedDate,
                present,
                absent
            });
        }

        return result;
    };
    const data = generateAttendanceData(); 

    return (
        <div className='bg-gray-600 mt-8 col-span-2 w-[98%] rounded p-5'>
            <div className='flex justify-between items-center mb-4'>
                <p>Total Attendence Report</p>
                <div className='flex justify-between items-center'>
                    <p>🔴 Absent</p>
                    <p>🟢 Present</p>
                </div>
            </div>
            <div className='w-[100%] h-[300px] ml-[-20px]' >
                <ResponsiveContainer>
                    <LineChart data={data} >
                        <CartesianGrid strokeDasharray="3 3"  />
                        <XAxis dataKey="date" stroke='white' />
                        <YAxis stroke='white' />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="present"
                            stroke="green"
                        />
                        <Line
                            type="monotone"
                            dataKey="absent"
                            stroke="red"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div> 
            
        </div>
    );
}

export default TotalAttendence
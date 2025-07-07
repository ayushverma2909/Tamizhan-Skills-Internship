import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

const SideNav = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(true)

    function toggleSideBar(){
        setIsSideBarOpen(prev => !prev)
    }

  return (
    <>
        <div>
            <div className={isSideBarOpen?"hidden":'flex flex-col items-center h-full justify-between bg-gray-800 text-white'}>
                <button
                    onClick={toggleSideBar}
                    className="m-2"
                    >
                    ☰
                </button>
                <button className="m-2 mb-5">
                    <IoSettingsSharp />
                </button>
            </div>
            {
                isSideBarOpen &&
                <aside className="w-50 bg-gray-800 text-white p-4 relative border-r border-gray-700 h-screen">
                    <button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="size-8 rounded-full"
                        />
                    </button>
                    <button 
                        className='absolute top-4 right-4 hover:cursor-pointer md:hidden'
                        onClick={toggleSideBar}
                    >❌</button> 
                    <div className='flex flex-col justify-between h-full  '>
                        <div className='mt-8 '>
                            <ul>
                                <Link to="/">  <li className='flex items-center gap-1 mb-3 hover:bg-gray-700'><MdSpaceDashboard />Dashboard</li></Link> 
                                <Link to="students"><li className='flex items-center gap-1'><MdSpaceDashboard />Student Information</li></Link>
                                
                            </ul>
                        </div>
                        <div className='mb-8'>
                            <ul>
                                <li className='flex items-center gap-1 '><IoSettingsSharp />Settings</li>
                            </ul>
                        </div>
                    </div> 
                </aside>   
            }
       </div>
    </>
  )
}

export default SideNav
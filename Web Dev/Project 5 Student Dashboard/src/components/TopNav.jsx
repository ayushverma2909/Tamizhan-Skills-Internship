import React, {useState} from 'react'
import { AiFillMessage } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const TopNav = () => {

    const [val, setVal] = useState("")

    function handleValue(e){
        const value = e.target.value
        setVal(value)
    }


  return (
    <header className='flex justify-between items-center border-b border-gray-700 p-5'>
        <div className='flex items-center relative '>
            <div className="absolute right-2 top-1 border-l border-gray-400 px-2 h-8 flex items-center">
                <FaSearch
                    onClick={() => setVal("")}
                    className="w-6 h-6 text-gray-400 cursor-pointer 
                            hover:text-gray-200 
                            active:scale-90 
                            transition duration-100"
                />
            </div>
            <input type="text"
                value={val}
                onChange={handleValue}
                placeholder='For Demo Only' 
                className='text-gray-300 rounded bg-gray-600 py-2 pr-12 pl-2 min-w-[300px]'/>
        </div>

        <div className='flex'>
            <AiFillMessage />
            <IoIosNotifications className='w-5 h-5'/>
        </div>
    </header>
  )
}

export default TopNav
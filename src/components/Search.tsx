import React, { useState } from 'react'
import { FiFilter } from "react-icons/fi";

const Search: React.FC = () => {
    const [showCategories, setShowCategories] = useState(false)


  return (
        <div className='flex flex-row gap-1 items-center'>
               <div className='relative inline-block'>
            <div onClick={() => setShowCategories(!showCategories)} className='p-2 rounded-full cursor-pointer'>
            <FiFilter className='text-2xl cursor-pointer' />
            </div>
            {showCategories && (
                <div className='absolute top-10 left-0 bg-white border rounded-xl shadow-lg p-2 w-40 z-20'>
                    <select className='w-full  rounded-xl p-2 text-sm'>
                        <option>Date</option>
                        <option>Category</option>
                        <option>Time</option>
                    </select>
                </div>
            )}
            
        </div>
        <input
            id="search"
            type="text"
            placeholder="Search"
            className='w-[300px] px-4 py-2 border rounded-xl'
        />
     
        </div>        
  )
}

export default Search
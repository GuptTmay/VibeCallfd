import React, { useContext } from 'react'
import { Avatar } from '@mui/material'
import logoIcon from '../assets/vcIconPink.png'
import { UserContext } from '../lib/UserContext'

const Navbar = () => {
  const { user } = useContext(UserContext);    

  return (
    <div className='flex justify-between items-center w-full pt-3 pb-2 px-8 bg-purple-950'>
      <div className='flex '>
        {/* <FontAwesomeIcon icon={faBars} size='2xl' className='active:scale-110 cursor-pointer' style={{color: "#d1d5dc",}} /> */}
        <span className="inline-flex items-center text-2xl font-semibold cursor-pointer text-gray-300 ml-3">
          <span className="text-red-400"><span className='text-3xl'>V</span>ibe</span>
          <span className='text-purple-400'><span className='text-3xl'>C</span>all</span>
        </span>
      </div>

      <div className='flex justify-center items-center gap-4'>
         <button className="sm:flex items-center hidden gap-2 px-4 py-2 cursor-pointer active:scale-110 rounded-full bg-purple-500 text-white text-sm font-medium border border-[#444] shadow-[0px_0px_10px_rgba(255,255,255,0.2)] hover:bg-purple-600 transition">
          <span className="w-5 h-5 animate-pulse">
            <img src={logoIcon} alt="icons" />
          </span>
          Try VibeCall Pro 
        </button> 
        <Avatar alt='Profile Image' className='border-1 border-purple-500 bg-white scale-110 cursor-pointer hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]' src={`https://robohash.org/${user.status === "" ? "3" : user.id}`} sx={{width: 40, height: 40}}></Avatar>
      </div>
    </div>
  )
}

export default Navbar
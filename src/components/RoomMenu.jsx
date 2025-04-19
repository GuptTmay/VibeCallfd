import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../lib/UserContext'
import { RoomIdContext } from '../lib/RoomIdContext.jsx'
import { toast } from 'react-toastify';
import { AuthMenuStatus } from '../constants/AuthMenuStatus.js';
import Button from './Button.jsx'; 

import { Avatar } from '@mui/material'
import { logoutUser, setUserStatus } from '../lib/api';

const RoomMenu = ({ setAuthMenu }) => {
  const { user } = useContext(UserContext);
  const { setRoomId } = useContext(RoomIdContext);
  const navigator = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(user.email); 
      setAuthMenu(AuthMenuStatus.DEFAULT);
      toast.success('Logout successful!');
    } catch (e) {
      toast.error(e.message);
    } 
  }

  const handleRoomJoin = () => {
      const newRoomId = makeId(6);
      setRoomId(newRoomId)
      navigator(`/room/${newRoomId}?roomId=${newRoomId}`); 
      toast("Creating a Room!!");
      setUserStatus(user.email, "BUSY");
  }

  // 44 Billions Permutations
  const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 62
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className="flex flex-col items-center rounded-2xl mt-8 transition-all duration-300">
      <div className='relative'>
        <Avatar
          alt="Profile"
          src={`https://robohash.org/${user.status === "" ? "3" : user.id}`}
          sx={{ width: 100, height: 100 }}
          className="border-2 border-purple-500 hover:border-purple-700 transition-all duration-300"
        />

        <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white
          ${user.status === "ONLINE" ? "bg-green-500" : user.status === "BUSY" ? "bg-yellow-500" : "bg-gray-400"}`}>
        </span>
      </div>

      <h2 className="text-xl font-semibold mt-4 text-purple-700">Welcome, {user.name}</h2>

      <button
        onClick={handleRoomJoin}
        className="mt-6 px-5 py-2 cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 "
      >
        Join a Room
      </button>

      <div className="flex justify-center items-center mt-6 w-full">
        <Button
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default RoomMenu;

import { useState, useEffect, useContext } from "react";
import Popover from "@mui/material/Popover";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

import { getAllUsers, getUserInvite, removeUserInvite, sendUserInvite } from "../lib/api.js";
import UserInviteCard from "./UserInviteCard";
import UserGetInviteCard from "./UserGetInviteCard.jsx";
import { UserContext } from "../lib/UserContext.jsx";
import { RoomIdContext } from "../lib/RoomIdContext.jsx";

import mailIcon from "../assets/mail.svg";
import personAddIcon from "../assets/personadd.svg";
import notiIcon from "../assets/noti.svg";
import searchIcon from "../assets/search.svg";
import refreshIcon from "../assets/refresh.svg";
import { setUserStatus } from '../lib/api';
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
  const navigator = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUsers, setShowUsers] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [userInvite, setUserInvite] = useState([]);
  const { user } = useContext(UserContext);
  const { roomId } = useContext(RoomIdContext);
  const open = Boolean(anchorEl);
  const id = open ? "menu-popover" : undefined;
  let timeOutId;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    const filtered = data.filter((u) => {
      return u.id !== user.id;
    });
    setAllUsers(filtered);
  };

  const fetchInvites = async () => {
    const data = await getUserInvite(user.id);
    setUserInvite(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchInvites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterUsers = (str) => {
    if (str === "") {
      fetchUsers();
      return;
    }
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      const lower = str.toLowerCase();
      const data = allUsers.filter((u) => {
        let email = u.email.toLowerCase();
        let name = u.name.toLowerCase();
        return email.startsWith(lower) || name.startsWith(lower);
      });
      setAllUsers(data);
    }, 300);
  };

  const handleUserInvite = async (rUser) => {
    if (roomId === null) {
      toast.error("Create A room First Please");
      return;
    }
    try {
      await sendUserInvite(user.id, rUser.id, roomId);
      toast.info(`${rUser.name} was invited.`);
    } catch (e) {
      toast.error(e.message || "Invite Failed!");
    }
  };

  const handleGetUserInvite = (i) => {
      navigator(`/room/${i.roomId}?roomId=${i.roomId}`); 
      toast("Joining a Room!!");
      setUserStatus(user.email, "BUSY");  
      handleIgnoreUserInvite(i);
  }

  const handleIgnoreUserInvite = async (i) => {
    await removeUserInvite(i.inviteId);
    await fetchInvites();
  }

  return (
    <div className="absolute mt-16 ml-5 z-10">
      <div
        aria-describedby={id}
        className="p-3 bg-gray-700 rounded-2xl cursor-pointer hover:scale-105 transition-transform text-white"
        onClick={handleClick}
      >
        <img src={mailIcon} alt="Menu" />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className="w-80 p-4 flex flex-col gap-4 h-120 overflow-y-auto">
          {/* Tabs */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setShowUsers(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                showUsers ? "bg-gray-100 border-gray-400" : "border-transparent"
              } hover:scale-105 transition-transform`}
            >
              <img src={personAddIcon} alt="All Users" className="w-5 h-5" />
              <span>All Users</span>
            </button>
            <button
              onClick={() => setShowUsers(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                !showUsers
                  ? "bg-gray-100 border-gray-400"
                  : "border-transparent"
              } hover:scale-105 transition-transform`}
            >
              <img src={notiIcon} alt="Invitations" className="w-5 h-5" />
              <span>Invitations</span>
            </button>
          </div>

          {/* Content */}
          {showUsers ? (
            <>
              <div className="flex items-center px-2">
                <IconButton sx={{ p: "5px" }}>
                  <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </IconButton>
                <InputBase
                  placeholder="Search users..."
                  sx={{ ml: 1, flex: 1 }}
                  onChange={(e) => filterUsers(e.target.value)}
                  inputProps={{ "aria-label": "search users" }}
                />
                <IconButton sx={{ p: "5px" }} onClick={fetchUsers}>
                  <img src={refreshIcon} alt="Refresh" className="w-5 h-5" />
                </IconButton>
              </div>

              <ul className="mt-2 space-y-2">
                {allUsers.length > 0 ? (
                  allUsers.map((u) => (
                    <UserInviteCard
                      key={u.id}
                      user={u}
                      onInvite={() => handleUserInvite(u)}
                    />
                  ))
                ) : (
                  <li className="text-center text-sm text-gray-500">
                    No users available.
                  </li>
                )}
              </ul>
            </>
          ) : (
            // Invitations
            <>
              <div className="flex items-center justify-end px-2">
                <IconButton sx={{ p: "5px" }} onClick={fetchInvites}>
                  <img src={refreshIcon} alt="Refresh" className="w-5 h-5" />
                </IconButton>
              </div>

              <ul className="mt-2 space-y-2">
                {userInvite.length > 0 ? (
                  userInvite.map((i) => (
                    <UserGetInviteCard
                      key={i.inviteId}
                      invite={i}
                      onAccept={() => handleGetUserInvite(i)}
                      onIgnore={() => handleIgnoreUserInvite(i)}
                    />
                  ))
                ) : (
                  <li className="text-center text-sm text-gray-500">
                    No invitations yet.
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default MenuButton;

// import { useState, useEffect, useContext } from "react";
// import Popover from "@mui/material/Popover";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import UserInviteCard from "./UserInviteCard";
// import { getAllUsers } from "../lib/api.js";
// import { UserContext } from "../lib/UserContext.jsx";

// import mailIcon from "../assets/mail.svg";
// import personAddIcon from "../assets/personadd.svg";
// import notiIcon from "../assets/noti.svg";
// import searchIcon from "../assets/search.svg";
// import refreshIcon from "../assets/refresh.svg"
// import { toast } from "react-toastify";

// const MenuButton = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [showUsers, setShowUsers] = useState(true);
//   const [allUsers, setAllUsers] = useState([]);
//   // const [refreshData, setRefreshData] = React.useState(false);
//   const user = useContext(UserContext);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     const test = async () => {
//       let data = await getAllUsers();
//       data = data.filter(u => u.id !== user.id);
//       setAllUsers(data);
//     };
//     test();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const open = Boolean(anchorEl);
//   const id = open ? "menu-popover" : undefined;

//   return (
//     <div className="absolute mt-16 ml-5 z-10">
//       <div
//         aria-describedby={id}
//         className="p-3 bg-gray-700 rounded-2xl cursor-pointer hover:scale-105 transition-transform text-white"
//         onClick={handleClick}
//       >
//         <img src={mailIcon} alt="Menu" />
//       </div>

//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <div className="w-80 p-4 flex flex-col gap-4 h-120">
//           {/* Toggle Tabs */}
//           <div className="flex justify-center gap-2">
//             <button
//               onClick={() => setShowUsers(true)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
//                 showUsers ? "bg-gray-100 border-gray-400" : "border-transparent"
//               } hover:scale-105 transition-transform`}
//             >
//               <img src={personAddIcon} alt="All Users" className="w-5 h-5" />
//               <span>All Users</span>
//             </button>
//             <button
//               onClick={() => setShowUsers(false)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
//                 !showUsers
//                   ? "bg-gray-100 border-gray-400"
//                   : "border-transparent"
//               } hover:scale-105 transition-transform`}
//             >
//               <img src={notiIcon} alt="Invitations" className="w-5 h-5" />
//               <span>Invitations</span>
//             </button>
//           </div>

//           {/* Content */}
//           {showUsers ? (
//             <>
//               {/* Search Bar */}
//               <div className="flex items-center border rounded-md px-2">
//                 <IconButton sx={{ p: "5px" }}>
//                   <img src={searchIcon} alt="Search" className="w-5 h-5" />
//                 </IconButton>
//                 <InputBase
//                   placeholder="Search users..."
//                   sx={{ ml: 1, flex: 1 }}
//                   inputProps={{ "aria-label": "search users" }}
//                 />
//                 <IconButton sx={{ p: "5px" }}>
//                   <img src={refreshIcon}  alt="Refresh" className="w-5 h-5" />
//                 </IconButton>
//               </div>

//               {/* List Placeholder */}
//               <ul className="mt-2 text-sm text-gray-600">
//                 {allUsers.map((u) => (
//                   <UserInviteCard
//                     key={u.id}
//                     user={u}
//                     onInvite={(u) => {
//                       toast("User was invited by" + u.name);
//                     }}
//                   />
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <div className="text-sm text-gray-600">No invitations yet.</div>
//           )}
//         </div>
//       </Popover>
//     </div>
//   );
// };

// export default MenuButton;

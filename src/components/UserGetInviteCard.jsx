import React from "react";
import checkIcon from "../assets/check.svg";
import closeIcon from "../assets/close.svg";

const UserGetInviteCard = ({ invite, onAccept, onIgnore }) => {
  return (
    <div className="flex items-center justify-between w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
      {/* Avatar + Status */}
      <div className="relative w-10 h-10 mr-4">
        <img
          src={`https://robohash.org/${invite.senderId}`}
          alt={invite.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            invite.status === "ONLINE"
              ? "bg-green-500"
              : invite.status === "BUSY"
                ? "bg-yellow-500"
                : "bg-gray-400"
          }`}
        />
      </div>

      {/* Name & Email */}
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-sm truncate">{invite.name}</div>
        <div className="text-xs text-gray-500 truncate">{invite.email}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAccept}
          className="inline-flex items-center cursor-pointer gap-1 px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-transform transform hover:scale-105"
        >
          <img src={checkIcon} alt="Accept" className="w-4 h-4" />
        </button>
        <button
          onClick={onIgnore}
          className="inline-flex items-center cursor-pointer gap-1 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-transform transform hover:scale-105"
        >
          <img src={closeIcon} alt="Reject" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserGetInviteCard;

// import React from "react";
// import checkIcon from "../assets/check.svg";
// import closeIcon from "../assets/close.svg";

// const UserGetInviteCard = ({ invite, onAccept, onIgnore }) => {
//   return (
//     <div className="flex items-center justify-between w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//       {/* Avatar + Status */}
//       <div className="relative w-10 h-10 mr-4">
//         <img
//           src={`https://robohash.org/` + invite.senderId}
//           alt={invite.name}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         {/* <span
//           className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
//             user.status === "ONLINE"
//               ? "bg-green-500"
//               : user.status === "BUSY"
//                 ? "bg-yellow-500"
//                 : "bg-gray-400"
//           }`}
//         /> */}
//       </div>

//       {/* Name & Email */}
//       <div className="flex-1 overflow-hidden">
//         <div className="font-medium text-sm truncate">{invite.name}</div>
//         <div className="text-xs text-gray-500 truncate">{invite.email}</div>
//       </div>

//       {/* Invite Button */}
//       <button
//         onClick={() => onAccept()}
//         className="text-sm bg-green-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
//       >
//         <img src={checkIcon} alt="Accept" />
//       </button>

//        {/* Ignore Button */}
//       <button
//         onClick={() => onIgnore()}
//         className="text-sm bg-red-600 hover:bg-blue-700 text-white px-3 py-1 mx-1 rounded-md"
//       >
//         <img src={closeIcon} alt="Reject" />
//       </button>
//     </div>
//   );
// };

// export default UserGetInviteCard;

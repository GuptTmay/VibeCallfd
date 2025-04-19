import React from "react";

const UserInviteCard = ({ user, onInvite }) => {
  return (
    <div className="flex items-center justify-between w-full mt-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
      {/* Avatar + Status */}
      <div className="relative w-10 h-10 mr-4">
        <img
          src={`https://robohash.org/` + user.id}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            user.status === "ONLINE"
              ? "bg-green-500"
              : user.status === "BUSY"
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        />
      </div>

      {/* Name & Email */}
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-sm truncate">{user.name}</div>
        <div className="text-xs text-gray-500 truncate">{user.email}</div>
      </div>

      {/* Invite Button */}
      <button
        onClick={() => onInvite(user)}
        className="text-sm bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 rounded-md"
      >
        Invite
      </button>
    </div>
  );
};

export default UserInviteCard;

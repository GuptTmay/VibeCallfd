import { useState } from "react";
import { RoomIdContext } from "./RoomIdContext";

export const RoomIdProvider = ({ children }) => {
  
  const [roomId, setRoomId] = useState(null);

  return (
    <RoomIdContext.Provider value={{roomId, setRoomId}}>
      {children}
    </RoomIdContext.Provider>
  );
};


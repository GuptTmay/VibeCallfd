import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const defaultUser = {
    id: "",
    name: "",
    email: "",
    status: "",
  } 
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user"); 
    return storedUser ? JSON.parse(storedUser) : defaultUser;
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

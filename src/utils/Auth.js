import { createContext, useState } from "react";

export const Auth = createContext();

export const Validation = ({ children }) => {
  /* ---------------------------------- State --------------------------------- */
  const [user, setUser] = useState({});
  const [token, setToken] = useState(false);

  /* --------------------------------- Log Out -------------------------------- */
  const logOut = () => {
    setToken(false);
  };

  const globalStates = {
    // State
    user,
    setUser,
    token,
    setToken,
    // Function
    logOut,
  };
  return <Auth.Provider value={globalStates}>{children}</Auth.Provider>;
};

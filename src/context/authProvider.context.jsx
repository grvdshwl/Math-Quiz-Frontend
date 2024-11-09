import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create context for user details
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserDetails = (data) => {
    setUserDetails(data);
  };

  const signupUser = (data) => {
    setUserDetails(data);
    setIsAuthenticated(true);
  };

  const loginUser = (data) => {
    setUserDetails(data);

    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setUserDetails({
      email: "",
      name: "",
    });
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        isAuthenticated,
        updateUserDetails,
        loginUser,
        signupUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

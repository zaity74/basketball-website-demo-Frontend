// src/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isLogin, user } = useSelector(state => state.userLogin);
  const [auth, setAuth] = useState({ isAuthenticated: isLogin, userData: user });

  useEffect(() => {
    // Vérification du statut de l'utilisateur depuis Redux
    setAuth({ isAuthenticated: isLogin, userData: user });
  }, [isLogin, user]);

  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

// src/componnents/protectedRoute/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const PrivateRoute = () => {
  const { auth } = useUserContext();

  if (!auth.isAuthenticated) {
    // Redirige l'utilisateur vers la page de connexion s'il n'est pas authentifié
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

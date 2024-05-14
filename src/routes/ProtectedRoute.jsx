import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TokenCheck} from "../Tokencheck";


export function ProtectedRoute({ children}) 
{
  const token = Cookies.get("token");

  if (!token || !TokenCheck()) 
  {
    return <Navigate to="/login" />; // Reindirizza se non autenticato
  }

  const userRoles = getRole();

  return <>{children}</>; 
}

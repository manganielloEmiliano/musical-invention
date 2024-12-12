import { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("auth-token");
  
    
    return !isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
  };
  

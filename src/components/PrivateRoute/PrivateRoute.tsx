    import { ReactNode ,FC} from "react";
    import { Navigate } from "react-router-dom";

    interface PrivateRouteProps {
        children:ReactNode
    }

    export const PrivateRoute:FC<PrivateRouteProps> = ({ children }) => {
        const isAuthenticated = !!localStorage.getItem("auth-token");
    
        return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
    };

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';

const RequireAuth = ({ allowedRoles }) => {
    const { auth  } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? 
                toast.error("Unauthorised To Access Page")

                // <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;
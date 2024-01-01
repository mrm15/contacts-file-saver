import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {PAGES} from "../Pages/Route-string.tsx";

const RequireAuth = ({allowedRoles}) => {
    debugger
    const {auth} = useAuth();
    const location = useLocation();
    let isAllowed = false
    try {
        isAllowed = auth?.userInfo[allowedRoles] === true

    } catch (error) {
        isAllowed = false
    }
    // const isAllowed = auth?.userInfo?.find(role => allowedRoles?.includes(role));
    // const isAllowed = auth?.userInfo[allowedRoles] === true


    return (
        isAllowed
            ? <Outlet/>
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to={PAGES.LOGIN} state={{from: location}} replace/>
    );
}

export default RequireAuth;
import {useContext, useDebugValue} from "react";
import AuthContext from "../context/AuthProvider";

interface authInterFace {
    name?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    province?: string;
    city?: string;
    address?: string;
}

const useAuth = () => {

    // @ts-ignore
    const {auth}: authInterFace = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;
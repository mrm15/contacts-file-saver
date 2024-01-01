import axios from "../api/axios";
import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.tsx";
import {useNavigate} from "react-router-dom";

const useLogout = () => {
    // @ts-ignore
    const { setAuth } = useAuth();
    const myPrivateAxios = useAxiosPrivate()

    const logout = async () => {
        try {
            const response = await myPrivateAxios.get('/logout', {
                withCredentials: true
            });
            debugger
            debugger
            debugger
            debugger
            debugger
            debugger
            debugger
            setAuth({})


        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
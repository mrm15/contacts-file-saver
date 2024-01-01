import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";
import Loader from "./Loader";

const PersistLogin = () => {
    debugger
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    const [persist] = useLocalStorage('persist', false);


    // @ts-ignore
    useEffect(() => {

        debugger
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
                debugger
            } catch (err) {
                debugger
                console.error(err);
            } finally {
                debugger
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        if (!auth.accessToken) {
            setIsLoading(true)
            verifyRefreshToken().then(r => {
                console.log(r)
            })
        } else {
            setIsLoading(false)
        }

        return () => isMounted = false;
    }, [])



    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading
                    ? <Loader />
                    : <Outlet/>
            }
        </>
    )
}

export default PersistLogin
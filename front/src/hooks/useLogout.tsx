import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.tsx";

const useLogout = () => {
    // @ts-ignore
    const { setAuth } = useAuth();
    const myPrivateAxios = useAxiosPrivate()

    const logout = async () => {
        try {
            await myPrivateAxios.get('/logout', {
                withCredentials: true
            });

            setAuth({})


        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
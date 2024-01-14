import useAuth from "../../../hooks/useAuth.tsx";
import useLogout from "../../../hooks/useLogout.tsx";
import {useNavigate} from "react-router-dom";


function HeaderMenu() {


    // @ts-ignore
    const {auth} = useAuth();

    const logout = useLogout();
    const navigateTo = useNavigate()


    const signOut = async () => {

        const yes = confirm("آیا میخواهید از سایت خارج شوید؟")
        if(yes){
            await logout();
            navigateTo('/');
        }

    }

    return (
        <ul className={'absolute left-0 w-44 flex flex-col p-5 bg-zinc-300 z-10'}>

            <li
                onClick={signOut}
                className={'cursor-pointer block  rounded px-4 hover:bg-blue-400'}>خروج از سایت
            </li>
        </ul>
    );
}

export default HeaderMenu;
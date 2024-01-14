import useAuth from "../../../hooks/useAuth.tsx";
import useLogout from "../../../hooks/useLogout.tsx";
import {useNavigate} from "react-router-dom";


function HeaderMenu(props) {


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
        <div className={'absolute left-0 w-44 flex flex-col p-5 bg-amber-300'}>

            <div
                onClick={signOut}
                className={'cursor-pointer'}>خروج از سایت
            </div>
        </div>
    );
}

export default HeaderMenu;
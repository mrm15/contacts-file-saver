import './DashboardBody.scss';
import {useLocation, useNavigate} from "react-router-dom";

import useLogout from "../../../hooks/useLogout.tsx";
import LogoImg from "../../../assets/images/LogoImg";


const HeaderDashboard = () => {

    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const title = location.state?.title !== undefined ? location.state.title : "پیشخوان";

    const navigate = useNavigate()
    const logout = useLogout();

    const signOut = async () => {

        const yes = confirm("آیا میخواهید از سایت خارج شوید؟")
        if(yes){
            await logout();
            navigate('/');
        }

    }
    return (

        <div className="main-header">
            <LogoImg/>

            <div className="title-side w-full flex justify-between items-center">
                <div className={'flex justify-between align-middle'}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(270)">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0}/>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier">
                            <title>ic_fluent_app_title_24_filled</title>
                            <desc>Created with Sketch.</desc>
                            <g id="🔍-Product-Icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="ic_fluent_app_title_24_filled" fill="#334667" fillRule="nonzero">
                                    <path
                                        d="M4.75,20.5 L19.25,20.5 C19.6642136,20.5 20,20.8357864 20,21.25 C20,21.6296958 19.7178461,21.943491 19.3517706,21.9931534 L19.25,22 L4.75,22 C4.33578644,22 4,21.6642136 4,21.25 C4,20.8703042 4.28215388,20.556509 4.64822944,20.5068466 L4.75,20.5 L19.25,20.5 L4.75,20.5 Z M16.25,3 C18.3210678,3 20,4.67893219 20,6.75 L20,15.25 C20,17.3210678 18.3210678,19 16.25,19 L7.75,19 C5.67893219,19 4,17.3210678 4,15.25 L4,6.75 C4,4.67893219 5.67893219,3 7.75,3 L16.25,3 Z"
                                        id="🎨-Color"/>
                                </g>
                            </g>
                        </g>
                    </svg>

                    <h4>{title}</h4>
                </div>


                <div className={'flex'}>
                    <div>
                        کاربر عزیز خوش آمدید
                        <span>&nbsp;&nbsp;&nbsp;</span></div>
                    <div
                        onClick={signOut}
                        className={'cursor-pointer'}>خروج از سایت
                    </div>
                </div>
            </div>


            <hr/>
        </div>
    );
};

export default HeaderDashboard;
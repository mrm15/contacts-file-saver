import HeaderMenu from "./HeaderMenu.tsx";
import {useEffect, useRef, useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth.tsx";


function ProfileInHeader() {
    // @ts-ignore
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const containerRef = useRef(null);


    useEffect(() => {
        const handleDocumentClick = (event) => {
            // Check if the clicked element is outside of the container
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        // Attach the event listener
        document.addEventListener("click", handleDocumentClick);

        // Remove the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);


    // @ts-ignore
    const {auth} = useAuth();
    try {

        return (
            <div className={'relative'}
                //onBlur={() => setOpenMenu(false)}
                 ref={containerRef}
            >


                <button
                    className={'rounded bg-zinc-200 px-1 flex items-center'}
                    //onMouseMove={() => setOpenMenu(true)}
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <FaUserCircle size={48}/>

                    <div className={'hidden md:block'}>
                        {auth?.userInfo?.name ? auth?.userInfo?.name : 'کاربر'} <span>&nbsp;&nbsp;&nbsp;</span>
                    </div>


                </button>
                <div
                    //onMouseMove={() => setOpenMenu(true)}
                    //onMouseLeave={() => setOpenMenu(false)}
                >

                    <div className={openMenu ? '' : 'hidden'}>
                        <HeaderMenu/>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ProfileInHeader;

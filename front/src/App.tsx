import './App.css'
import Pages from "./Pages/Pages";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, {useEffect, useRef} from "react";


const App: React.FC = () => {
    const offlineToastRef = useRef<any>(null);

    useEffect(() => {
        const updateOnlineStatus = () => {
            const isOnline = navigator.onLine;
            if (isOnline) {
                toast.dismiss(offlineToastRef.current);
                toast.success('ارتباط بر قرار شد. 😎', {
                    position: 'bottom-center',
                });
            } else {
                offlineToastRef.current = toast.error('دسترسی به  اینترنت نداریم!😕', {
                    position: 'bottom-center',
                    autoClose: false,
                });
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={2500}
                rtl
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <Pages />
        </>
    );
};

export default App;






// Add a request interceptor

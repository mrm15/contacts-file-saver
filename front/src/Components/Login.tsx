import {useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
import LoginRegisterParent from "./Login_register_parent.tsx";

const LOGIN_URL = '/auth';

const Login = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const userInfo = response?.data?.userInfo;

            //localStorage.setItem("3319173716", JSON.stringify({user, roles, accessToken}))
            setAuth({userInfo, accessToken});
            resetUser();
            setPwd('');
            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('اطلاعات ورود صحیح نیست');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <LoginRegisterParent>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>ورود به پنل نمارنگ</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">نام کاربری:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        {...userAttribs}
                        required
                    />

                    <label htmlFor="password">رمز عبور:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button
                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                    >ورود به سایت</button>
                    <div className="persistCheck">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={toggleCheck}
                            checked={check}
                        />
                        <label htmlFor="persist">اعتماد به این دستگاه</label>
                    </div>
                </form>
                <p>
                    اگر حساب کاربری ندارید<br/>
                    <span className="line">
                    <Link to="/register">
                        <div className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>
                            ثبت نام در سایت
                        </div>
                    </Link>
                </span>
                </p>
            </section>
        </LoginRegisterParent>

    )
}

export default Login

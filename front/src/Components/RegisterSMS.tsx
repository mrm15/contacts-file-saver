import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import {Link} from "react-router-dom";
import Login_register_parent from "./Login_register_parent.tsx";
import {toast} from "react-toastify";

// const PHONE_NUMBER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const LOGIN_CODE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_NUMBER_REGEX = /^0\d{10}$/;

const LOGIN_CODE_REGEX = /^.{4,}$/;

const REGISTER_URL = '/register/verify';
const SEND_LOGIN_CODE_URL = '/register/new';


const RegisterSMS = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [loginCode, setLoginCode] = useState('');
    const [validLoginCode, setValidLoginCode] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPhoneNumber(PHONE_NUMBER_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setValidLoginCode(LOGIN_CODE_REGEX.test(loginCode));
    }, [loginCode])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, loginCode, matchPwd])

    const handleLogin = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PHONE_NUMBER_REGEX.test(phoneNumber);
        if (!v1) {
            setErrMsg("شماره تماس جهت ارسال پیامک وارد کنید");
            return;
        }
        try {
            const response = await axios.post(SEND_LOGIN_CODE_URL,
                JSON.stringify({phoneNumber: phoneNumber}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            if (!response.data) {
                return
            }

            toast.success(response?.data?.message)

        } catch (err) {
            //console.log(err)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PHONE_NUMBER_REGEX.test(phoneNumber);
        const v2 = LOGIN_CODE_REGEX.test(loginCode);
        if (!v1 || !v2) {
            setErrMsg("اطلاعات را به درستی وارد کنید");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({phoneNumber:phoneNumber, loginCode}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            if (!response.data) {
                return
            }
            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setPhoneNumber('');
            setLoginCode('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('هیچ پیامی از سمت سرور دریافت نشد!!');
            } else if (err.response?.status === 409) {
                setErrMsg('نام کاربری تکراری');
            } else {
                setErrMsg('ثبت نام انجام نشد!!')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <Login_register_parent>
                <div>{success ? (
                    <section>
                        <h1>شما ثبت نام شدید</h1>
                        <p className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>
                            <Link to={'/login'}>برای ورود به سایت کلیک کنید</Link>
                        </p>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>ثبت نام</h1>
                        <form>
                            <label htmlFor="username">
                                شماره موبایل:
                                <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}/>
                            </label>
                            <input
                                dir={"ltr"}
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                required
                                aria-invalid={validPhoneNumber ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote"
                               className={userFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                شماره موبایل ده رقم شروع با صفر</p>


                            <button disabled={!validPhoneNumber}
                                    onClick={handleLogin}
                                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                            >
                                ارسال کد
                            </button>

                            <label htmlFor="password">
                                کد ورود:
                                <FontAwesomeIcon icon={faCheck} className={validLoginCode ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validLoginCode || !loginCode ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="text"
                                id="password"
                                onChange={(e) => setLoginCode(e.target.value)}
                                value={loginCode}
                                required
                                aria-invalid={validLoginCode ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validLoginCode ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>

                                کد ورود پیامک شده به موبایل خود را وارد کنید
                            </p>


                            <button disabled={!validPhoneNumber || !validLoginCode}
                                    onClick={handleSubmit}
                                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                            >ثبت نام در سایت
                            </button>
                        </form>
                        <p>
                            قبلا ثبت نام کردید؟<br/>
                            <span className="line">
                            <Link to="/">ورود به سایت</Link>
                        </span>
                        </p>
                    </section>
                )}</div>
            </Login_register_parent>
        </>
    )
}

export default RegisterSMS

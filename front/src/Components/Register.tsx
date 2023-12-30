import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import {Link} from "react-router-dom";
import Login_register_parent from "./Login_register_parent.tsx";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USER_REGEX = /^.{5,}$/;
const PWD_REGEX = /^.{8,}$/;

const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("اطلاعات را به درستی وارد کنید");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            if (!response.data) {
                return
            }
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
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
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                نام کاربری:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                بین 4 تا 24 کاراکتر<br/>
                                با یک حرف شروع شود.<br/>
                                حروف،اعداد، آندرلاین،منها، کاراکتر های مجاز هستند.
                            </p>


                            <label htmlFor="password">
                                رمز عبور:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                بین 8 تا 24 کاراکتر<br/>
                                باید شامل حروف بزرگ و کوچک و اعداد و یک کاراکتر باشد !@#$%^&*)(

                                <br/>
                                کاراکترهای مجاز <span aria-label="exclamation mark">!</span> <span
                                aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label htmlFor="confirm_pwd">
                                تکرار رمز عبور:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validMatch || !matchPwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                رمز های عبور باید یکسان باشند.
                            </p>

                            <button disabled={!validName || !validPwd || !validMatch}

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

export default Register

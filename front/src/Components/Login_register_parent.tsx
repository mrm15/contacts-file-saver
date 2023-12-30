import "./login_register.scss"
import register_login_page from "../assets/images/register-login-page.jpg"

function LoginRegisterParent(props) {
    return (
        <div className={'register__page flex items-center justify-center h-screen w-full'}>
            {props.children}
            <div className={'hidden md:block'}>
                <img src={register_login_page} alt=""/>
            </div>
        </div>
    );
}

export default LoginRegisterParent;
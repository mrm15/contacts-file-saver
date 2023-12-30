import Logo from "./logo_home_page.jpg";

function LogoImg() {
    return (
        <div className="bg-indigo-100">
            <img src={Logo} alt="نمارنگ" className="object-cover"/>
        </div>
    );
}

export default LogoImg;
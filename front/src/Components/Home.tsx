import {useNavigate, Link} from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();


    return (
        <section>
            <div className={'flex w-full justify-between mt-8'}>

                <Link to="/editor">صفحه ی ویرایش</Link>
                <Link to="/admin">صفحه ویژه ادمین</Link>
                <Link to="/lounge">صفحه گپ الکی</Link>
                <Link to="/linkpage">صفحه ی لینک های مفید سایت</Link>
            </div>


            <div className={'flex '}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">صفحه اصلی</div>
                        <p className="text-gray-700 text-base">
                            توضیحات
                        </p>
                    </div>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">لیست سفارشات</div>
                        <p className="text-gray-700 text-base">
                            توضیحات
                        </p>
                    </div>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">صفحه نمونه</div>
                        <p className="text-gray-700 text-base">
                            توضیحات
                        </p>
                    </div>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">صفحه ثبت سفارش</div>
                        <p className="text-gray-700 text-base">
                            توضیحات
                        </p>
                    </div>
                </div>

            </div>


        </section>
    )
}

export default Home

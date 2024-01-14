import { Link} from "react-router-dom";
import {PAGES} from "../Pages/Route-string.tsx";

const Home = () => {


    const shortcuts = [
        { title:'افزودن مخاطب' , description:"افزودن مخاطب جدید به لیست ", icon:'blobb', link:PAGES.ADD_CONTACT},
        { title:'مشاهده لیست مخاطبین' , description:"لیست مخاطبین ", icon:'blobb', link:PAGES.LIST_CONTACTS},
        { title:'افزودن کاربر' , description:"افزودن کاربر جدید به لیست  ", icon:'blobb', link:PAGES.ADD_USER},
        { title:'لیست کاربران' , description:"مشاهده لیست کاربران ", icon:'blobb', link:PAGES.LIST_USERS},
    ]


    return (
        <section>
            <div className={'flex w-full justify-between mt-8'}>

                {/*<Link to="/editor">صفحه ی ویرایش</Link>*/}
                {/*<Link to="/admin">صفحه ویژه ادمین</Link>*/}
                {/*<Link to="/lounge">صفحه گپ الکی</Link>*/}
                {/*<Link to="/linkpage">صفحه ی لینک های مفید سایت</Link>*/}
            </div>


            <div className={'flex flex-wrap'}>

                {shortcuts.map((row,index)=>{


                    return <Link
                        to={row.link}
                                 key={index}
                                className="max-w-sm rounded overflow-hidden shadow-lg"

                    >

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{row?.title}</div>
                            <p className="text-gray-700 text-base">
                                {row?.description}
                            </p>
                        </div>

                    </Link>
                })}

                {/*<div className="max-w-sm rounded overflow-hidden shadow-lg">*/}
                {/*    <div className="px-6 py-4">*/}
                {/*        <div className="font-bold text-xl mb-2">صفحه اصلی</div>*/}
                {/*        <p className="text-gray-700 text-base">*/}
                {/*            توضیحات*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}



            </div>


        </section>
    )
}

export default Home

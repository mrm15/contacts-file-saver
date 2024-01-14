import {Link} from "react-router-dom";

const Unauthorized = () => {

    return (
        <div>

            <div>
                <div className={'p-5 leading-6'}>
                    کاربر عزیز
                    <br/>
                    همه چی سرجاش هست و شما هنوزم میتونید با سامانه کار کنید فقط دسترسی به این صفحه رو ندارید. همین!

                </div>

                <Link to={"/"}
                className={'cursor-pointer bg-blue-400 p-2 rounded'}
                >
                    برو به داشبورد
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized

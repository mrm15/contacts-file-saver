import {Link} from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>لینک ها</h1>
            <br/>
            <h2>لینک های عمومی</h2>
            <Link to="/login">وررود به سایت </Link>
            <br/>
            <Link to="/register">عضویت در سایت</Link>
            <br/>
            <h1>لینک های خصوصی</h1>
            <Link to="/">صفحه خانه</Link>
            <br/>
            <Link to="/editor">صفحه ویرایشگران</Link>
            <br/>
            <Link to="/admin"> صفحه مدیر</Link>
        </section>
    )
}

export default LinkPage

import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>صفحه ی مورد نظر  وجود نداره</h1>
            <p>Page Not Found</p>
            <div className="flexGrow cursor-pointer text-blue-800">
                <Link to="/">بریم ب صفحه ی اصلی </Link>
            </div>
        </article>
    )
}

export default Missing

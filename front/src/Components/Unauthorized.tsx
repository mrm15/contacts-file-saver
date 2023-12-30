import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>عدم مجوز دسترسی</h1>
            <br />
            <p>شما مجوز دستری به این صفحه را ندارید!</p>
            <div className="flexGrow">
                <button onClick={goBack}>بازگشت به صفحه ی قبلی</button>
            </div>
        </section>
    )
}

export default Unauthorized

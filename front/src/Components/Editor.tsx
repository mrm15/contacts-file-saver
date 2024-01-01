import { Link } from "react-router-dom"

const Editor = () => {
    debugger
    return (
        <section>
            <h1>فعلا چیزی نداریم</h1>
            <br />
            <p>کاربرانی که نقش ویرایشگر  دارند میتونن این صفحه رو ببینن</p>
            <div className="flexGrow">
                <Link to="/">صفحه اصلی</Link>
            </div>
        </section>
    )
}

export default Editor

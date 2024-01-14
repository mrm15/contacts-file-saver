import {Outlet} from "react-router-dom"
import SideBar from "./SideBar/SideBar.tsx";
import HeaderDashboard from "./Dashboard/DashboardBody/HeaderDashboard.tsx";
import FooterDashboard from "./Dashboard/DashboardBody/FooterDashboard.tsx";
import './style.scss'
const Layout = () => {


    const number = 1;
    if (number === 1) {
        return <main className="main-dashboard0 prevent__horizontal__scroll">
            {/*<HeaderDashboard/>*/}
            <div className={'flex'}>
                <SideBar/>
                <div className="w-full">
                    <div className="main-outlet0 min-h-screen">
                        <HeaderDashboard/>
                        <div style={{minHeight: '85vh', overflowY: 'scroll'}}>
                            <Outlet/>
                        </div>
                        <FooterDashboard/>
                    </div>
                </div>
            </div>

        </main>
    } else {
        return (
            <main className="App">
                <Outlet/>
            </main>
        )
    }

}

export default Layout

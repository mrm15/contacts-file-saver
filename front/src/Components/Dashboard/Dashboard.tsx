import {Outlet} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HeaderDashboard from "./DashboardBody/HeaderDashboard";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FooterDashboard from "./DashboardBody/FooterDashboard";
import './Dashboard.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {

    return (
        <main className="main-dashboard0 ">
            {/*<HeaderDashboard/>*/}
            <div className={'flex gap-6'}>
                <SideBar/>
                <div className="w-full">

                    <div className="main-outlet0 min-h-screen">
                        <HeaderDashboard/>

                        <div
                            style={{minHeight: '85vh', overflowY: 'scroll'}}
                        >
                            <Outlet/>
                        </div>
                        <FooterDashboard/>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Dashboard;
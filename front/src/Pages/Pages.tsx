import {Route, Routes} from "react-router-dom";

import SellFactor from "../Components/SellFactor/SellFactor";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import Layout from "../Components/Layout";
import LinkPage from "../Components/LinkPage"
import Unauthorized from "../Components/Unauthorized"
import PersistLogin from "../Components/PersistLogin"
import RequireAuth from "../Components/RequireAuth"
import Editor from "../Components/Editor"
import Home from "../Components/Home"
import Admin from "../Components/Admin"
import Missing from "../Components/Missing"
import Lounge from "../Components/Lounge"
import RegisterSMS from "../Components/RegisterSMS.tsx";
import LoginSMS from "../Components/LoginSMS.tsx";

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150,
}

const Pages = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (

        <>
            <Routes>
                {/* pages all people can see and no need to side bar */}
                <Route path="login" element={<LoginSMS/>}/>
                <Route path="register" element={<RegisterSMS/>}/>



                {/* pages all people can see and need sidebar */}
                <Route path="/" element={<Layout/>}>
                    {/* public routes */}
                    <Route path="linkpage" element={<LinkPage/>}/>
                    <Route path="unauthorized" element={<Unauthorized/>}/>
                    <Route path="SellFactor" element={<SellFactor/>}/>
                    <Route path="ListProduct" element={<ListProduct/>}/>

                    {/* pages loggedIn users can see and need sidebar */}

                    {/* we want to protect these routes */}
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                            <Route path="/" element={<Home/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
                            <Route path="editor" element={<Editor/>}/>
                            <Route path="AddProduct" element={<AddProduct/>}/>

                        </Route>


                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                            <Route path="admin" element={<Admin/>}/>
                            {/*<Route path="settings" element={<Settings/>}/>*/}
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>}>
                            <Route path="lounge" element={<Lounge/>}/>
                        </Route>
                    </Route>

                    {/* catch all */}
                    <Route path="*" element={<Missing/>}/>
                </Route>
                {/*<Route path="/" element={<Dashboard/>}>*/}
                {/*    <Route path="/" element={<MainDashboardPage/>}/>*/}
                {/* Namarang */}
                {/*<Route path="SellFactor" element={<SellFactor/>}/>*/}
                {/*<Route path="AddProduct" element={<AddProduct/>}/>*/}
                {/*<Route path="ListProduct" element={<ListProduct/>}/>*/}
                {/*</Route>*/}
            </Routes>
        </>

    );
};

export default Pages;
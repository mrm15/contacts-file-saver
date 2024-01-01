import {Route, Routes} from "react-router-dom";

import Layout from "../Components/Layout";
import PersistLogin from "../Components/PersistLogin"
import RequireAuth from "../Components/RequireAuth"
import Editor from "../Components/Editor"
import Home from "../Components/Home"
import Admin from "../Components/Admin"
import Missing from "../Components/Missing"
import Lounge from "../Components/Lounge"
import LoginSMS from "../Components/LoginSMS.tsx";

import {PAGES} from "./Route-string.tsx"
import AddContact from "../Components/Contact/AddContact.tsx";

const ROLES = {
    "addContactAccess": "addContactAccess",
    "editContactAccess": "editContactAccess",
    "deleteContactAccess": "deleteContactAccess",
    "listAllContactAccess": "listAllContactAccess",
    "listOwnContactAccess": "listOwnContactAccess",
    "addUserAccess": "addUserAccess",
    "deleteUserAccess": "deleteUserAccess",
    "editUserAccess": "editUserAccess",
    "listUserAccess": "listUserAccess",
}


const Pages = () => {


    debugger
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <>
            <Routes>
                {/* pages all people can see and no need to side bar */}
                {/*<Route path="register" element={<RegisterSMS/>}/>*/}
                <Route path="login" element={<LoginSMS/>}/>


                {/* pages all people can see and need sidebar */}

                <Route element={<PersistLogin/>}>
                    <Route path="/" element={<Layout/>}>
                        {/* public routes */}


                        {/*<Route path="linkpage" element={<LinkPage/>}/>*/}
                        {/*<Route path="unauthorized" element={<Unauthorized/>}/>*/}
                        {/*<Route path="SellFactor" element={<SellFactor/>}/>*/}
                        {/*<Route path="ListProduct" element={<ListProduct/>}/>*/}

                        {/* pages loggedIn users can see and need sidebar */}

                        {/* we want to protect these routes */}

                        <Route element={<RequireAuth allowedRoles={ROLES.addContactAccess}/>}>
                            <Route path={'/'} element={<Home/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>
                            <Route path={PAGES.EDIT_USER} element={<Home/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.addContactAccess}/>}>
                            <Route path={PAGES.ADD_CONTACT} element={<AddContact
                                contactData={{}}
                            />}/>
                            {/*<Route path="add-contact" element={<AddProduct/>}/>*/}

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
                </Route>
                <Route path="*" element={<Missing/>}/>

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
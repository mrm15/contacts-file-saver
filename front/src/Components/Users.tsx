import {useState, useEffect} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate, useLocation} from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });

                //console.log(response.data);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                isMounted && setUsers(response.data);
            } catch (err) {
                // always get Error why???
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }




        }

        void getUsers();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, location, navigate])

    return (
        <article>
            <h2>لیست کاربران سایت</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{i+1}_{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;

import {Link, Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import AxiosClient from "../../axios-client.js";

export default function TutorLayout(){
    const {user, token, setUser, setToken, type} = useStateContext()
    const navigate = useNavigate();
    if(!token || type !== "tutor"){
        return <Navigate to={'/login'}/>
    }else{
        <Navigate to={'/tutor/dashboard'}/>
    }

    const onLogout = (e) => {
        e.preventDefault();

        AxiosClient.post('/logout').then(() => {
            setUser(null);
            setToken(null);
            navigate('/');
        })
    }

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Tutor dashboard
                    </div>
                    <div>
                        {user.name}
                        <a className="btn-logout" href="src/components/layouts/TutorLayout#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

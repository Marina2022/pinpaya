import {Link, Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import AxiosClient from "../axios-client.js";
import {Col, Container, Row} from "react-bootstrap";

export default function DefaultLayout(){
    const {user, token, setUser, setToken, type} = useStateContext()
    const navigate = useNavigate();

    if(!token || type !== "student"){
        return <Navigate to={'/login'}/>
    }else{
        <Navigate to={'/student/dashboard'}/>
    }
    const onLogout = (e) => {
        e.preventDefault();

        AxiosClient.post('/logout').then(() => {
            setUser(null);
            setToken(null);
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
                        Student Layout
                    </div>
                    <div>
                        {user.name}
                        <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
                <Container>
                    <Row>
                        <Col>1 of 1</Col>
                        <Col>1 of 1</Col>
                        <Col>1 of 1</Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

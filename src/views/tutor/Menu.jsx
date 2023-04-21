import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {
    BoxArrowRight,
    Calendar2,
    CurrencyExchange, Laptop,
    ListUl,
    MortarboardFill, Person,
    PersonBadge
} from "react-bootstrap-icons";
import {useStateContext} from "../../contexts/ContextProvider";
import AxiosClient from "../../axios-client";
import MyLessons from "../tutor/MyLessons";
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'

export default function Menu(){
    const {setUser, setToken, token, type} = useStateContext()
    const location = useLocation();

    if(!token || type !== "tutor"){
        return <Navigate to={'/login'}/>
    }else{
        <Navigate to={'/tutor'}/>
    }

    const onLogout = (e) => {
        e.preventDefault();

        signOut(auth);

        AxiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        })
    }

    return(
        <Container>
            <Row className="my-5">
                <Col md="3">
                    <div className="border p-4 bg-white">
                        <div className="m-2"><Link to="my-lessons"> <Laptop size="20" color="red"/> My lessons</Link></div>
                        <div className="m-2"><Link to="my-tutor-profile"> <MortarboardFill size="20" color="red"/> My tutor profile</Link></div>
                        <div className="m-2"><Link to="my-schedule"> <Calendar2 size="20" color="red"/> My schedule</Link></div>
                        <div className="m-2"><Link to="order-history"> <ListUl size="20" color="red"/> Order History</Link></div>
                        <div className="m-2"><Link to="my-earnings"> <CurrencyExchange size="20" color="red"/> My Earnings</Link></div>
                        <div className="m-2"><Link to="account-settings"> <Person size="20" color="red"/> Account Settings</Link></div>
                        <div className="m-2 text-dark logout-menu"  onClick={onLogout}><BoxArrowRight size="20" color="red"/> Logout </div>
                    </div>
                </Col>
                <Col md="9">
                    { location.pathname == '/tutor' ? <MyLessons/> : '' }
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    )
}
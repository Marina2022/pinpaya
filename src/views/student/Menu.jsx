import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {
    BoxArrowRight,
    CardChecklist,
    Laptop,
    ListUl,
    Person,
    Wallet
} from "react-bootstrap-icons";
import './student.css'
import AxiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {useEffect} from "react";
import axiosClient from "../../axios-client";
import MyLessons from "./MyLessons";
import {signOut} from "firebase/auth";
import { auth } from '../../firebase'
export default function Menu(){
    const {setUser, setToken, token, type} = useStateContext()
    const location = useLocation();
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })
    }, [])

    if(!token || type !== "student"){
        return <Navigate to={'/login'}/>
    }else{
        <Navigate to={'/student'}/>
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
                        <div className="m-2"><Link to="order-history"><ListUl size="20" color="red"/>   Order history</Link></div>
                        <div className="m-2"><Link to="my-wallet"><Wallet size="20" color="red"/> My wallet</Link></div>
                        <div className="m-2"><Link to="payment-methods"><CardChecklist size="20" color="red"/> Payment methods</Link> </div>
                        <div className="m-2"><Link to="account-settings"><Person size="20" color="red"/> Account settings</Link> </div>
                        <div className="m-2 text-dark logout-menu"  onClick={onLogout}><BoxArrowRight size="20" color="red"/> Logout </div>
                    </div>
                </Col>
                <Col md="9">
                    { location.pathname == '/student' ? <MyLessons/> : '' }
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    )
}
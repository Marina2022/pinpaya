import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
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
import {useState} from "react";

export default function Menu(){
    const {setUser, setToken, token, type, user} = useStateContext()
    const location = useLocation();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(false);

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

    const resendLink = () => {
        AxiosClient.post('tutor/resend-email').then((data) => {
            setMsg(true);
        })
    }

    return(
        <Container>
            <Row className="my-5">
                <Col lg="3">
                    <div className="border p-4 bg-white user-left-menu">
                        <div className="m-2"><Link to="my-lessons"> <img src="/smenu1.svg" /> My lessons</Link></div>
                        <div className="m-2"><Link to="my-tutor-profile"> <img src="/tprofile.svg" /> My tutor profile</Link></div>
                        <div className="m-2"><Link to="my-schedule"> <img src="/tschedule.svg" /> My schedule</Link></div>
                        <div className="m-2"><Link to="order-history"> <img src="/smenu2.svg" /> Order History</Link></div>
                        <div className="m-2"><Link to="my-earnings"> <img src="/smenu3.svg" />  My Earnings</Link></div>
                        <div className="m-2"><Link to="account-settings"> <img src="/smenu5.svg" />  Account Settings</Link></div>
                        <div className="m-2 logout-menu" style={{color:'#dc3545'}}  onClick={onLogout}><img src="/menulogout.svg" />  Logout </div>
                    </div>
                </Col>
                <Col lg="9">
                    {user && user.email_verified_at == null &&
                        <div class="p-4 border mb-4" role="alert" style={{background:'white'}}>
                            <h4 className="text-dark">Please verify your account</h4>
                            <h6><button style={{background: 'black'}} onClick={resendLink} className="btn mt-4">Resend link</button></h6>
                        </div>
                    }

                    {msg &&
                        <div class="alert alert-success mb-3" role="alert" style={{ backgroundColor: '#d4edda'}}>
                            <h4 className="text-dark">Email sended</h4>
                        </div>
                    }
                    { location.pathname == '/tutor' ? <MyLessons/> : '' }
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    )
}
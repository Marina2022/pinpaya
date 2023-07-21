import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
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
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import MyLessons from "./MyLessons";
import {signOut} from "firebase/auth";
import { auth } from '../../firebase'
import {useTranslation} from "react-i18next";
export default function Menu(){
    const {setUser, setToken, token, type,user} = useStateContext()
    const location = useLocation();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(false);
    const {t, i18n} = useTranslation();

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

    const resendLink = () => {
        AxiosClient.post('student/resend-email').then((data) => {
            setMsg(true);
        })
    }

    return(
        <Container>
            <Row className="my-5">
                <Col lg="3">
                    <div className="border p-4 bg-white user-left-menu">
                        <div className="m-2"><Link to="my-lessons"> <img src="/public/smenu1.svg" />{t('my_lessons')}</Link></div>
                        <div className="m-2"><Link to="order-history"><img src="/public/smenu2.svg" />{t('order_history')}</Link></div>
                        <div className="m-2"><Link to="my-wallet"><img src="/public/smenu3.svg" />{t('my_wallet')}</Link></div>
                        <div className="m-2"><Link to="payment-methods"><img src="/public/smenu4.svg" />{t('payment_methods')}</Link> </div>
                        <div className="m-2"><Link to="account-settings"><img src="/public/smenu5.svg" />{t('account_settings')}</Link> </div>
                        <div className="m-2 logout-menu" style={{color:'#dc3545'}} onClick={onLogout}><img src="/public/menulogout.svg" />  {t('logout')} </div>
                    </div>
                </Col>
                <Col lg="9">
                    {user && user.email_verified_at == null &&
                        <div class="p-4 border mb-4" role="alert" style={{background:'white'}}>
                            <h4 className="text-dark">{t('verif_account')}</h4>
                            <h6><button style={{background: 'black'}} onClick={resendLink} className="btn mt-4">{t('resend_link')}</button></h6>
                        </div>
                    }

                    {msg &&
                        <div class="alert alert-success mb-3" role="alert" style={{ backgroundColor: '#d4edda'}}>
                            <h4 className="text-dark">{t('email_sended')}</h4>
                        </div>
                    }
                    { location.pathname == '/student' ? <MyLessons/> : '' }
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    )
}

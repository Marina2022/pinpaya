import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    Chat, ChatSquareFill,
    Person, PersonBadge, PersonCircle, Wallet, Wallet2, WalletFill,
} from 'react-bootstrap-icons';

import {CloseButton, Col, Row, Spinner} from "react-bootstrap";
import '../css/main.css'
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {AuthContext} from "../contexts/AuthContext";
import Home from "./chat/Home";
import AxiosClient from "../axios-client";

export default function MainLayout(){
    const {user, type, setUser} = useStateContext()
     const [showChat, setShowChat] = useState(false);
     const [showLoader, setShowLoader] = useState(null);
    // const {currentUser} = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        setShowLoader(true);
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
            setShowLoader(false);
        }).catch(err => { setShowLoader(false)})
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            axiosClient.get('/user').then(({data}) => {
                setUser(data);
            })
        }, 3000);
        return () => {
            document.body.style.overflow = 'unset';
            clearInterval(interval);
        };
    }, []);

    const handleChatClose = () => {
        setShowChat(false);
        document.body.style.overflow = 'unset';
    }
    // const handleChatShow = () => setShowChat(!showChat);

    // useEffect(() => {
    //     axiosClient.get('/user').then(({data}) => {
    //         setUser(data);
    //     })
    // }, [])

    const triggerMessage = () => {
        setShowChat(true);
        document.body.style.overflow = 'hidden';
        AxiosClient.post('/set-notif',{type: type ?? null, id: user ? user.id : null, notif: 0}).then((data) => {
            setUser(data)
        })
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })
    }

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container style={{maxWidth:'100%', margin:'0 40px'}}>
                    <Navbar.Brand> <Link to="/"><img src="/pinpaya-logo.svg" alt="logo"/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto top-navbar">
                            <Nav.Link className={location.pathname == '/find-tutor' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"> <Link to="/find-tutor" className={location.pathname == '/find-tutor' ? 'text-white' : ''} >Find a private tutor</Link></Nav.Link>
                            <Nav.Link className={location.pathname == '/become-tutor' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"><Link to="/become-tutor" className={location.pathname == '/become-tutor' ? 'text-white' : ''}>Become a private tutor</Link></Nav.Link>
                            <Nav.Link className={location.pathname == '/faq' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"><Link to="/faq" className={location.pathname == '/faq' ? 'text-white' : ''}>FAQ</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    {showLoader ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        user ? (
                                <div className="menu-glob-icons">
                                    <Link className="text-decoration-none" to={type === 'tutor' ? '/tutor/my-earnings' : '/student/my-wallet'}>
                                    <div className="p-2 fw-bold text-dark">
                                        <div style={{display: 'flex'}}>
                                            {/*<Wallet2 size={24}/>*/}
                                            <img src="/coin.svg" style={{width:'34px'}} />
                                            <div style={{marginLeft:'10px'}} className="hide-mobile">
                                                <div className="amount-block" style={ !user?.cashback ? {fontSize:'22px'} : {}}>
                                                    <div>{user?.wallet} €</div>
                                                    <div className="text-success" style={{fontSize:'11px'}}>{user?.cashback ? `+ ${user?.cashback}€ cashback` : ''}</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                    <Link className="text-decoration-none messageTrigger position-relative" onClick={() => triggerMessage()}><div className="p-2 fw-bold">
                                        <img src="/nchat.svg" alt=""/>
                                        { user?.notif == 1 &&
                                            <div className="unread"></div>
                                        }
                                    </div></Link>
                                    <Link className="text-decoration-none" to={`/${type}`}><div className="p-2 fw-bold">
                                        {/*<PersonCircle className="login-svg" size={24} />*/}
                                        { user?.avatar ?
                                            <img className="glob-nav-user" style={{width:'30px', height:'30px'}} src={'https://web.pinpaya.com/storage/'+user.avatar} /> :
                                            <img className="glob-nav-user" style={{width:'30px', height:'30px'}} src='https://app.pinpaya.com/no-image.png' />
                                        }
                                    </div>
                                    </Link>

                                </div>
                            ) : (
                                !showLoader &&
                                <Link
                                    className="btn btn-danger login-btn"
                                    role="button"
                                    to="/login"
                                >
                                    <div className="px-3 d-flex align-items-center fw-bold text-decoration-none "><Person className="login-svg" size={18} /> <span>Log in</span></div>
                                </Link>
                            )
                    )}

                        </Container>
            </Navbar>
            <main>
                <Outlet/>
            </main>
            <div className="bg-dark">
                <Container>
                    <footer className="bg-dark pt-3">
                        <Row>
                            <Col md="4 p-4">
                                <div className="text-white">
                                    <div><Link className="text-white" to="/about">About Pinpaya Group</Link></div>
                                    <div><Link className="text-white" to="/become-tutor">Become a private tutor</Link></div>
                                    <div><Link className="text-white" to="/find-tutor">Find a private tutor</Link></div>
                                    <div><Link className="text-white" to="/faq">Faq</Link> </div>
                                    <div><Link className="text-white" to="/support">Support</Link></div>
                                    <div><Link className="text-white" to="/blog">Blog</Link></div>
                                </div>
                            </Col>
                            <Col md="4 p-4">
                                <div>
                                    <div className="mb-3">Kas vajate abi?</div>
                                    <div className="mb-3">Kui teil on küsimusi, vajate raha tagasi või soovite meid lihtsalt tänada, võtke meiega ühendust meili teel. Püüame vastata 24 tunni jooksul.</div>
                                    <div>support@pinpaya.com</div>
                                </div>
                            </Col>
                            <Col md="4 p-4">
                                <div>English</div>
                                <div>Secure Payment</div>
                            </Col>
                        </Row>
                        <Row className="mt-5 pb-4">
                            <Col md="4">© 2023 Pinpaya LTD / Developed by Pineparks</Col>
                            <Col md="4"><Link className="text-white" to="/terms">Terms of use & General conditions</Link></Col>
                            <Col md="4"></Col>
                        </Row>
                    </footer>
                </Container>
            </div>
            {showChat && user &&
              <div>
                  <Home handleChatClose={handleChatClose}/>
              </div>
            }
        </>
    )
}
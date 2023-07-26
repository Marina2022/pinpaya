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
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";

export default function MainLayout(){
    const {user, type, setUser} = useStateContext()
     const [showChat, setShowChat] = useState(false);
     const [showLoader, setShowLoader] = useState(null);
     const {t, i18n} = useTranslation();
    // const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('i18next') || 'en')
    }, [])

    const languages = [
        {
            code: 'en',
            name: 'English',
            country_code: 'en',
        },
        {
            code: 'ru',
            name: 'Russian',
            country_code: 'ru',
        },
        {
            code: 'et',
            name: 'Estonian',
            country_code: 'et',
        },
    ]
    const location = useLocation();
    const currentLanguageCode = cookies.get('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

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



    const GlobeIcon = ({ width = 24, height = 24 }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="black"
            className="bi bi-globe"
            viewBox="0 0 16 16"
        >
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
        </svg>
    )

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container style={{maxWidth:'100%', margin:'0 40px'}}>
                    <Navbar.Brand> <Link to="/"><img src="/pinpaya-logo.svg" alt="logo"/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto top-navbar">
                            <Nav.Link className={location.pathname == '/find-tutor' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"> <Link to="/find-tutor" className={location.pathname == '/find-tutor' ? 'text-white' : ''} >{t('find_private_tutor')}</Link></Nav.Link>
                            <Nav.Link className={location.pathname == '/become-tutor' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"><Link to="/become-tutor" className={location.pathname == '/become-tutor' ? 'text-white' : ''}>{t('become_private_tutor')}</Link></Nav.Link>
                            <Nav.Link className={location.pathname == '/faq' ? 'active-top m-2 fw-bold text-white' : 'm-2 fw-bold text-dark'} href="#"><Link to="/faq" className={location.pathname == '/faq' ? 'text-white' : ''}>FAQ</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="dropdown" style={{float:'right'}}>
                        <button
                            className="btn btn-link dropdown-toggle btn-lang"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <GlobeIcon />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {languages.map(({ code, name, country_code }) => (
                                <li key={country_code}
                                    style={{cursor:'pointer'}}
                                    onClick={() => {
                                        localStorage.setItem('i18next', country_code);
                                        i18n.changeLanguage(code)
                                    }}
                                >
                                                <span
                                                    className={`flag-icon flag-icon-${country_code == 'en' ? 'us' : country_code} mx-2`}
                                                ></span>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
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
                                    <div className="px-3 d-flex align-items-center fw-bold text-decoration-none "><Person className="login-svg" size={18} /> <span>{t('login')}</span></div>
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
                                    <div><Link className="text-white" to="/about">{t('about_pinpaya')}</Link></div>
                                    <div><Link className="text-white" to="/become-tutor">{t('become_private_tutor')}</Link></div>
                                    <div><Link className="text-white" to="/find-tutor">{t('find_private_tutor')}</Link></div>
                                    <div><Link className="text-white" to="/faq">FAQ</Link> </div>
                                    <div><Link className="text-white" to="/support">{t('support')}</Link></div>
                                    <div><Link className="text-white" to="/blog">{t('blog')}</Link></div>
                                </div>
                            </Col>
                            <Col md="4 p-4">
                                <div>
                                    <div className="mb-3">{t('footer_1')}</div>
                                    <div className="mb-3">{t('footer_2')}</div>
                                    <div>support@pinpaya.com</div>
                                </div>
                            </Col>
                            <Col md="4 p-4">
                                {/*<div>English</div>*/}
                                <div>{t('secure_checkout')}</div>
                            </Col>
                        </Row>
                        <Row className="mt-5 pb-4">
                            <Col md="4">{t('footer_3')}</Col>
                            <Col md="4"><Link className="text-white" to="/terms">{t('footer_4')}</Link></Col>
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
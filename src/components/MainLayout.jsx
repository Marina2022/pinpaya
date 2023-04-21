import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    Chat, ChatSquareFill,
    Person, PersonBadge, PersonCircle, Wallet, Wallet2, WalletFill,
} from 'react-bootstrap-icons';

import {CloseButton, Col, Row} from "react-bootstrap";
import '../css/main.css'
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {useContext, useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {AuthContext} from "../contexts/AuthContext";

export default function MainLayout(){
    const {user, type, setUser} = useStateContext()
    // const [showChat, setShowChat] = useState(false);
    // const {currentUser} = useContext(AuthContext);

    // const handleChatClose = () => setShowChat(false);
    // const handleChatShow = () => setShowChat(!showChat);

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })
    }, [])

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand> <Link to="/">PINPAYA</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="m-2 fw-bold text-dark" href="#"><Link to="/find-tutor">Find a private tutor</Link></Nav.Link>
                            <Nav.Link className="m-2 fw-bold text-dark" href="#"><Link to="/become-tutor">Become a private tutor</Link></Nav.Link>
                            <Nav.Link className="m-2 fw-bold text-dark" href="#"><Link to="/faq">FAQ</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                        {user ? (
                            <>
                                <Link className="text-decoration-none" to={`/${type}/chat`}><div className="p-2 fw-bold"><ChatSquareFill size={24}/> </div></Link>
                                <Link className="text-decoration-none" to={`/${type}`}><div className="p-2 fw-bold"><PersonCircle className="login-svg" size={24} /></div> </Link>
                                <Link className="text-decoration-none" to={type === 'tutor' ? '/tutor/my-earnings' : '/student/my-wallet'}><div className="p-2 fw-bold text-dark"><Wallet2 size={24}/> {user?.wallet} €</div></Link>

                            </>
                        ) : (
                            <Link
                                className="btn btn-danger"
                                role="button"
                                to="/login"
                            >
                            <div className="px-3 d-flex align-items-center fw-bold text-decoration-none"><Person className="login-svg" size={18} /> <span>Log in</span></div>
                            </Link>
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
{/*            {showChat && user &&
                <div id="chat">
                    <div className="header bg-silver d-flex justify-content-between p-2">
                        <span className="fz-15">Messages</span>
                        <CloseButton onClick={handleChatClose}></CloseButton>
                    </div>
                    <div className="p-2">
                    </div>
                </div>
            }*/}
        </>
    )
}
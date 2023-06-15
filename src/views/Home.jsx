import {Button, Row, Col, Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {
    Calendar2,
    CardChecklist,
    CurrencyDollar,
    Headset,
    Laptop,
    MortarboardFill, Percent,
    PlayBtn, ShieldFill
} from "react-bootstrap-icons";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {Link, useNavigate} from "react-router-dom";

export default function Home(){
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        subject: '',
        price: ''
    });

    useEffect(() => {
        axiosClient.get('/get-subjects').then(({data}) => {
            setSubjects(data.data);
        })
    }, [])

    const send = (e) => {
        e.preventDefault();

        navigate("/find-tutor?subject="+data.subject+"&price="+data.price);
    }
    return(
        <>
            <div className="hero-block" >
                <Container>
                    <div className="info pb-4">
                        <div >
                            <h3 className="text-white fw-bold mb-1">Learn online anytime, anywhere!</h3>
                            <h6 className="text-white fw-bold">Online education platform that connects students and private tutors for 1-on-1 online lessons!</h6>
                        </div>
                    </div>
                    <div className="bg-white p-4">
                        <Form onSubmit={send}>
                            <Row className="d-flex align-items-end">
                                <Col sm="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">I want to learn</Form.Label>
                                        <Form.Select
                                            value={data?.subject} onChange={ev => setData({...data, subject : ev.target.value})}
                                        >
                                            <option value="">All</option>
                                            {   subjects &&
                                                subjects.map(({ id, name }) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Price per hour</Form.Label>
                                        <Form.Select
                                            value={data?.price} onChange={ev => setData({...data, price : ev.target.value})}
                                        >
                                            <option value="">All</option>
                                            <option value="1-10">1-10 €</option>
                                            <option value="10-20">10-20 €</option>
                                            <option value="20+">20+ €</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="pb-3" sm="4">
                                    <Button className="w-100 py-2 fw-bold" variant="danger" type="submit" style={{borderRadius: '3px'}}>
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="student-section">
                    <Row>
                        <Col md="6">
                            <div>
                                <div className="student-block">
                                    <h2 className="mb-5 mt-3 fw-bold">For a student</h2>
                                    <div className="m-4"> <Laptop size="20" color="red" /> Learn online anytime, anywhere </div>
                                    <div className="m-4"> <Calendar2 size="20" color="red" className="pr-4" />  Smart calendar </div>
                                    <div className="m-4"> <PlayBtn size="20" color="red" className="pr-4"/> Video classroom </div>
                                    <div className="m-4"> <CardChecklist size="20" color="red" className="pr-4" /> Convenient payment method </div>
                                    <div className="m-4"> <MortarboardFill size="20" color="red" className="pr-4" /> Large selection of tutors and prices </div>
                                    <Link to='find-tutor'><Button variant="outline-danger" className="mt-4 mb-3 fw-bold">START LEARNING</Button></Link>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div>
                                <img className="main-img img-fluid" src="/student-main.webp" alt="student"/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div className="tutor-section">
                    <Row>
                        <Col md="6">
                            <div>
                                <img className="main-img img-fluid "  src="/tutor-main.webp" alt="student"/>
                            </div>
                        </Col>
                        <Col md="6">
                            <div>
                                <div className="tutor-block">
                                    <h2 className="mb-5 mt-3 fw-bold">For a tutor</h2>
                                    <div className="m-4"> <Headset size="20" color="red" className="mr-4"  /> Teach online anytime, anywhere </div>
                                    <div className="m-4"> <Calendar2 size="20" color="red" className="mr-4" />  Make your own schedule/calendar </div>
                                    <div className="m-4"> <CurrencyDollar size="20" color="red" className="mr-4"/> Set your own rate and earn money </div>
                                    <div className="m-4"> <MortarboardFill size="20" color="red" className="mr-4" /> Grow professionally </div>
                                    <div className="m-4"> <Percent size="20" color="red" className="mr-4" /> Low commission </div>
                                    <div className="m-4"> <ShieldFill size="20" color="red" className="mr-4" /> Get paid securely </div>
                                    <Link to='become-tutor'><Button variant="outline-danger" className="mt-4 fw-bold">BECOME A PRIVATE TUTOR</Button></Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div className="how mb-4">
                    <h3 className="mb-3">How its work?</h3>
                    <Row>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3"><img width="300" height="200" src="/how1.svg" alt=""/></div>
                            <div className="text-center">
                                <div><b>Find a suitable tutor</b></div>
                                <div>Use the search option, set the criteria that suits you and choose from the list of available teachers</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3 "><img width="300" height="200" src="/how2.svg" alt=""/></div>
                            <div className="text-center">
                                <div><b>Book a lesson directly in the calendar</b></div>
                                <div>Check available times in the tutor's schedule for excellent results and regular lessons</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3"><img width="300" height="200" src="/how3.webp" alt=""/></div>
                            <div className="text-center">
                                <div><b>Enter the Pinpaya virtual classroom</b></div>
                                <div>When it’s lesson time, connect with your tutor through our comprehensive video platform</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Link to='find-tutor'> <Button variant="danger" size="lg" className="px-5 mt-5 mb-5 fw-bold">LETS START</Button> </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div className="how mb-4">
                    <Row>
                        <Col md="4">
                            <div className="text-center mb-3">
                                <div><b>
                                    What do you mean by online tutoring?</b></div>
                                <div>
                                    Online tutoring is the process of teaching students in an online, networked or virtual environment. Here, teachers and students participate from separate or the same physical locations.
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="text-center mb-3">
                                <div><b>Why is online tutoring the best?</b></div>
                                <div>A global online platform like Pinpaya.com helps people grow their learning in the comfort of their homes and learns, and talented people find jobs as tutors. Our online tutoring services offer more convenience and flexibility to students compared to traditional tutoring. We offer one-on-one online lessons for the students, but they can virtually take them from any location if they have access to the internet. So even if the child travels with the family, they don't need to skip important tutoring sessions.</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="text-center mb-3">
                                <div><b>Is online tutoring a good side job?</b></div>
                                <div>If you are experienced and have a passion for teaching, then you can enrol at Pinpaya.com as an online tutor to earn extra monthly money without disturbing the rest of the day's schedule. You can explore our website; here, you will find detailed information about the registration process.</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

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
import {useTranslation} from "react-i18next";

export default function Home(){
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        subject: '',
        price: ''
    });
    const {t, i18n} = useTranslation();
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
                            <h3 className="text-white fw-bold mb-1">{t('home1')}</h3>
                            <h6 className="text-white fw-bold">{t('home2')}</h6>
                        </div>
                    </div>
                    <div className="bg-white p-4">
                        <Form onSubmit={send}>
                            <Row className="d-flex align-items-end">
                                <Col sm="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">{t('i_want_learn')}</Form.Label>
                                        <Form.Select
                                            value={data?.subject} onChange={ev => setData({...data, subject : ev.target.value})}
                                        >
                                            <option value="">{t('all')}</option>
                                            {   subjects &&
                                                subjects.map(({ id, name }) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">{t('price_per_hour')}</Form.Label>
                                        <Form.Select
                                            value={data?.price} onChange={ev => setData({...data, price : ev.target.value})}
                                        >
                                            <option value="">{t('all')}</option>
                                            <option value="1-10">1-10 €</option>
                                            <option value="10-20">10-20 €</option>
                                            <option value="20+">20+ €</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="pb-3" sm="4">
                                    <Button className="w-100 py-2 fw-bold" variant="danger" type="submit" style={{borderRadius: '3px'}}>
                                        {t('search')}
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
                                    <h2 className="mb-5 mt-3 fw-bold">{t('for_student')}</h2>
                                    <div className="m-4"> <Laptop size="20" color="red" /> {t('home3')} </div>
                                    <div className="m-4"> <Calendar2 size="20" color="red" className="pr-4" />  {t('home4')}  </div>
                                    <div className="m-4"> <PlayBtn size="20" color="red" className="pr-4"/> {t('home5')}  </div>
                                    <div className="m-4"> <CardChecklist size="20" color="red" className="pr-4" /> {t('home6')}  </div>
                                    <div className="m-4"> <MortarboardFill size="20" color="red" className="pr-4" /> {t('home7')}  </div>
                                    <Link to='find-tutor'><Button variant="outline-danger" className="mt-4 mb-3 fw-bold">{t('find_private_tutor')}</Button></Link>
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
                                    <h2 className="mb-5 mt-3 fw-bold">{t('for_tutor')}</h2>
                                    <div className="m-4"> <Headset size="20" color="red" className="mr-4"  /> {t('home8')}  </div>
                                    <div className="m-4"> <Calendar2 size="20" color="red" className="mr-4" />  {t('home9')}  </div>
                                    <div className="m-4"> <CurrencyDollar size="20" color="red" className="mr-4"/> {t('home10')}  </div>
                                    <div className="m-4"> <MortarboardFill size="20" color="red" className="mr-4" /> {t('home11')}  </div>
                                    <div className="m-4"> <Percent size="20" color="red" className="mr-4" /> {t('home12')}  </div>
                                    <div className="m-4"> <ShieldFill size="20" color="red" className="mr-4" /> {t('home13')}  </div>
                                    <Link to='become-tutor'><Button variant="outline-danger" className="mt-4 fw-bold">{t('become_private_tutor')}</Button></Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div className="how mb-4">
                    <h3 className="mb-3">{t('how_it_works')}</h3>
                    <Row>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3"><img width="300" height="200" src="/how1.svg" alt=""/></div>
                            <div className="text-center">
                                <div><b>{t('home14')}</b></div>
                                <div>{t('home15')}</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3 "><img width="300" height="200" src="/how2.svg" alt=""/></div>
                            <div className="text-center">
                                <div><b>{t('home16')}</b></div>
                                <div>{t('home17')}</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="mb-3 text-center mt-3"><img width="300" height="200" src="/how3.webp" alt=""/></div>
                            <div className="text-center">
                                <div><b>{t('home18')}</b></div>
                                <div>{t('home19')}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Link to='find-tutor'> <Button variant="danger" size="lg" className="px-5 mt-5 mb-5 fw-bold">{t('find_private_tutor')}</Button> </Link>
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
                                    {t('home20')}</b></div>
                                <div>
                                    {t('home21')}
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="text-center mb-3">
                                <div><b>{t('home22')}</b></div>
                                <div>{t('home23')}</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="text-center mb-3">
                                <div><b>{t('home24')}</b></div>
                                <div>{t('home25')}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

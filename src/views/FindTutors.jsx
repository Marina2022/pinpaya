import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axios-client";
import {CurrencyEuro, Laptop, MortarboardFill, ShieldFillCheck} from "react-bootstrap-icons";
import {countries} from "../data";
import {Link, useLocation} from "react-router-dom";

export default function FindTutors(){
    const [tutors, setTutors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [checkTeach, setCheckTeach] = useState(false);
    const [checkTrial, setCheckTrial] = useState(false);
    const [checkVideo, setCheckVideo] = useState(false);
    const formRef = useRef();
    const [data, setData] = useState({
        search: '',
        subject: '',
        location: '',
        language: '',
        price: ''
    });
    const [dataShort, setDataShort] = useState({
        search: '',
        subject: '',
        location: '',
        language: '',
        price: ''
    });

    const searchAction = () => {

        const payload = {
            checkTeach:checkTeach,
            checkTrial:checkTrial,
            checkVideo: checkVideo,
            data:data
        }

        axiosClient.post('/search', payload).then(({data}) => {
            setTutors(data.data);
        })
    }
    const searchActionShort = () => {

        const payloadShort = {
            data:dataShort
        }

        axiosClient.post('/search', payloadShort).then(({data}) => {
            setTutors(data.data);
        })
    }
    const send = (e) => {
        e.preventDefault();
        searchAction();
    }

    useEffect(() => {
        axiosClient.get('/get-tutors').then(({data}) => {
            setTutors(data.data);
        })
        axiosClient.get('/get-form-fields').then(({data}) => {
            setSubjects(data.subjects);
            setLanguages(data.languages);
        })

    }, [])

    let check_price = params.get('price');
    let check_subject = params.get('subject');

    useEffect(() => {
        if(check_price || check_subject){

            if(check_price){
                setDataShort({...dataShort, price : check_price})
            }
            if(check_subject){
                setDataShort({...dataShort, subject : check_subject})
            }
            searchActionShort();
        }

    }, [check_price, check_subject])


    return(
        <Container>
            <h3 className="fw-bold my-5">Find a private tutor</h3>
            <Row className="mb-5" >
                <Col md={3}><Laptop size={40} color="#5b08a7" /> Where lessons take place</Col>
                <Col md={3}><MortarboardFill size={40} color="#5b08a7" /> How to choose an Ideal tutor</Col>
                <Col md={3}><CurrencyEuro size={40} color="#5b08a7" /> How you can pay for lessons</Col>
                <Col md={3}><ShieldFillCheck size={40} color="#5b08a7" /> 100% full refund</Col>
            </Row>
            <Row className="my-4">
                <Col md={4}>
                    <Form className="find-left-side" onSubmit={send}  ref={formRef}>
                        <Form.Group className="mb-4" controlId="11">
                            <Form.Control placeholder="Search by name or keyword" type="text"
                                          value={data?.search}
                                          onChange={ev => setData({...data, search : ev.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
                            <Form.Label className="fw-bold">I want to learn</Form.Label>
                            <Form.Select
                                value={data?.subject} onChange={ev => setData({...data, subject : ev.target.value})}
                            >
                                <option value="">All</option>
                                {   subjects &&
                                    subjects.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="13">
                            <Form.Label className="fw-bold">Tutor is from</Form.Label>
                            <Form.Select
                                value={data?.location} onChange={ev => setData({...data, location : ev.target.value})}
                            >
                                <option value="">All</option>
                                {
                                    countries &&
                                    countries.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
                            <Form.Label className="fw-bold">Tutor speaks</Form.Label>
                            <Form.Select
                                value={data?.language} onChange={ev => setData({...data, language : ev.target.value})}
                            >
                                <option value="">All</option>
                                {   languages &&
                                    languages.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
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
                        <Row className="mt-4">
                            <Col md={12}>
                                <Form.Check
                                    className="fw-bold mb-2"
                                    size="md"
                                    type="checkbox"
                                    label="Tutors who teach kids only"
                                    value={checkTeach} onChange={(e) => setCheckTeach(!checkTeach)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Check
                                    className="fw-bold mb-2"
                                    size="md"
                                    type="checkbox"
                                    label="Conducts trial lesson"
                                    value={checkTrial} onChange={(e) => setCheckTrial(!checkTrial)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Check
                                    className="fw-bold mb-2"
                                    size="md"
                                    type="checkbox"
                                    label="With introduction video"
                                    value={checkVideo} onChange={(e) => setCheckVideo(!checkVideo)}
                                />
                            </Col>
                        </Row>

                        <Button variant="outline-primary my-3" type="submit">Search</Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <Row>
                        {
                            tutors.length > 0 &&
                            tutors.map(item =>
                                <Col md={12} className="my-2">
                                    <div className="find-wrap">
                                        <Row>
                                            <Col md={3} className="d-flex justify-content-center align-items-center">
                                                { item.avatar ?
                                                    <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+item.avatar} alt="avatar"/>
                                                    : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                                                }

                                            </Col>
                                            <Col md={8}>
                                                <h5 ><Link to={'/tutor/'+item.id} >{item.name}</Link></h5>
                                                <small className="mb-2">{item.location}</small>
                                                <div className="mb-2">
                                                    <div className="pt-2">
                                                        <span className="fw-bold ">Teaches:</span>
                                                        {item.subject.map(item => <span className="pills">{item.name }</span>)}
                                                    </div>

                                                </div>
                                                <div className="mb-2">
                                                    <div className="pt-2">
                                                        <span className="fw-bold mb-2">Speaks:</span>
                                                      {item.language.map(item => <span className="pills">{item.name}</span>)}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={1}>
                                                <div className="fw-bold">{item.price} €</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            )
                        }
                        {
                            tutors.length == 0 &&
                            <div className="text-center mt-3">
                                <h3>No results</h3>
                            </div>
                        }
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import React, {useContext, useEffect, useRef, useState} from "react";
import axiosClient from "../axios-client";
import {CurrencyEuro, Laptop, MortarboardFill, ShieldFillCheck, Star, StarFill} from "react-bootstrap-icons";
import {countries} from "../data";
import {Link, useLocation} from "react-router-dom";
import firebaseCreateChat from "../hooks/firebaseCreateChat";
import {AuthContext} from "../contexts/AuthContext";
import {useStateContext} from "../contexts/ContextProvider";
import {useTranslation} from "react-i18next";

export default function FindTutors(){
    const [tutors, setTutors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [checkTeach, setCheckTeach] = useState(false);
    const [checkTrial, setCheckTrial] = useState(false);
    const [checkVideo, setCheckVideo] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const { currentUser } = useContext(AuthContext);
    const {type, user} = useStateContext();
    const {t, i18n} = useTranslation();
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
        setLoading(true);
        const payload = {
            checkTeach:checkTeach,
            checkTrial:checkTrial,
            checkVideo: checkVideo,
            data:data
        }

        axiosClient.post('/search', payload).then(({data}) => {
            setTutors(data.data);
            setLoading(false);
        }).catch(err => {setLoading(false)})
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
    let search_input = params.get('search');

    useEffect(() => {
        if(check_price || check_subject || search_input){

            if(check_price){
                setDataShort({...dataShort, price : check_price})
            }
            if(check_subject){
                setDataShort({...dataShort, subject : check_subject})
            }
            if(search_input){
                setDataShort({...dataShort, search : search_input})
            }

            searchActionShort();
        }

    }, [check_price, check_subject, search_input])

    const message = (tutor) => {
        firebaseCreateChat(currentUser, tutor, user);
        document.getElementsByClassName('messageTrigger')[0].click();
    }

    return(
        <Container>
            <h3 className="fw-bold my-5">{t('find_private_tutor')}</h3>
            <Row className="mb-5" >
                <Col md={3}><img src="/find1.svg" style={{width:'40px', marginRight:'10px'}} />{t('find_tutor_text1')}</Col>
                <Col md={3}><img src="/find2.svg" style={{width:'40px', marginRight:'10px'}} /> {t('find_tutor_text2')}</Col>
                <Col md={3}><img src="/find3.svg" style={{width:'40px', marginRight:'10px'}} /> {t('find_tutor_text3')}</Col>
                <Col md={3}><img src="/find4.svg" style={{width:'40px', marginRight:'10px'}} /> {t('find_tutor_text4')}</Col>
            </Row>
            <Row className="my-4">
                <Col md={4}>
                    <Form className="find-left-side" onSubmit={send}  ref={formRef}>
                        <Form.Group className="mb-4" controlId="11">
                            <Form.Control placeholder={t('search_placeholder')} type="text"
                                          value={data?.search}
                                          className="search-select"
                                          onChange={ev => setData({...data, search : ev.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
                            <Form.Label className="fw-bold">{t('i_want_learn')}</Form.Label>
                            <Form.Select
                                className="search-select"
                                value={data?.subject} onChange={ev => setData({...data, subject : ev.target.value})}
                            >
                                <option value="">{t('all')}</option>
                                {   subjects &&
                                    subjects.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="13">
                            <Form.Label className="fw-bold">{t('tutor_from')}</Form.Label>
                            <Form.Select
                                className="search-select"
                                value={data?.location} onChange={ev => setData({...data, location : ev.target.value})}
                            >
                                <option value="">{t('all')}</option>
                                {
                                    countries &&
                                    countries.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
                            <Form.Label className="fw-bold">{t('tutor_speaks')}</Form.Label>
                            <Form.Select
                                className="search-select"
                                value={data?.language} onChange={ev => setData({...data, language : ev.target.value})}
                            >
                                <option value="">{t('all')}</option>
                                {   languages &&
                                    languages.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="12">
                            <Form.Label className="fw-bold">{t('price_per_hour')}</Form.Label>
                                <Form.Select
                                    className="search-select"
                                    value={data?.price} onChange={ev => setData({...data, price : ev.target.value})}
                                >
                                    <option value="">{t('all')}</option>
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
                                    label={t('search_1')}
                                    color="white"
                                    value={checkTeach} onChange={(e) => setCheckTeach(!checkTeach)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Check
                                    className="fw-bold mb-2"
                                    size="md"
                                    type="checkbox"
                                    label={t('search_2')}
                                    value={checkTrial} onChange={(e) => setCheckTrial(!checkTrial)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Check
                                    className="fw-bold mb-2"
                                    size="md"
                                    type="checkbox"
                                    label={t('search_3')}
                                    value={checkVideo} onChange={(e) => setCheckVideo(!checkVideo)}
                                />
                            </Col>
                        </Row>

                        <Button className="my-4" variant="my-3 btn8" type="submit" style={{width:'100%'}}>
                            {
                                loading ?
                                    <Spinner animation="border" role="status" style={{width:'20px',height:'20px'}}>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> : t('search')
                            }
                        </Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <Row>
                        {
                            tutors.length > 0 &&

                            loading ?
                                <div style={{display:'flex', justifyContent: 'center', marginTop:'20px'}}>
                                    <Spinner animation="border" role="status" >
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                                :
                            tutors.map(item =>
                                <Col md={12} className="my-2">
                                    <div className="find-wrap">
                                        <Row>
                                            <Col md={3} className="d-flex justify-content-center align-items-center" >
                                                { item.avatar ?
                                                    <Link to={'/tutor/'+ item.id }><img className="avatar-wrap" style={{marginTop: '8px'}} src={'https://web.pinpaya.com/storage/'+item.avatar} alt="avatar"/></Link>
                                                    : <Link to={'/tutor/'+ item.id }><img className="avatar-wrap" style={{marginTop: '8px'}} src="https://app.pinpaya.com/no-image.png" /></Link>
                                                }

                                            </Col>
                                            <Col md={7}>
                                                <h5 className="d-flex">
                                                    <Link to={'/tutor/'+item.id} >{item.name}</Link>
                                                    {
                                                        item.check_teach == 1 &&
                                                        <div style={{marginLeft:'10px'}}>
                                                            <img style={{width:'18px', height:'18px'}} src="/child.svg" alt="child"/>
                                                        </div>
                                                    }
                                                </h5>
                                                <small className="mb-2" style={{fontSize:'10px'}}>{item.location}</small>
                                                <div className="mb-2 mt-2">
                                                    <div>
                                                        <span className="fw-bold ">{t('teaches')}: </span>

                                                        {item.subject.map((item, index) => <span>{index != 0 ? ', ' : '' }{item.name}</span>)}
                                                    </div>

                                                </div>
                                                <div className="mb-2">
                                                    <div>
                                                        <span className="fw-bold mb-2">{t('speaks')}: </span>
                                                      {item.language.map((item, index) => <span>{index != 0 ? ', ' : '' }{item.name} </span>)}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={2} style={{paddingLeft:'0'}}>
                                                <div className="fw-bold" style={{textAlign:'right',fontWeight:'bold', fontSize:'22px'}}><StarFill  color="gold" /> {item.price} €</div>
                                                {
                                                    item.check_trial == 1 ?
                                                        <div className="text-secondary" style={{textAlign:'right',fontSize:'12px'}}>{t('first_trial')}</div>
                                                        : <div style={{fontSize:'12px', color:'silver', fontWeight:'bold',textAlign:'right'}}>{t('per_hour')}</div>
                                                }
                                            </Col>
                                            <Col md={12}>
                                                <div className="d-flex justify-content-end">
                                                    <button className="btn1" style={{marginRight:'10px'}} onClick={() => message(item)}>
                                                        <img src="/nchat.svg" style={{width:'17px', marginRight: '10px'}} alt=""/>
                                                        {t('message')}
                                                    </button>
                                                    {item.check_trial == 0 ?
                                                        (<button className="btn2">
                                                            <Link className="text-white" to={'/tutor/'+ item.id }>{t('schedule_lessons')}</Link>
                                                        </button>) :
                                                        (
                                                            <Link to={'/tutor/'+ item.id }>  <button className="btn3">{t('schedule_trial_lesson')}</button></Link>
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            )
                        }
                        {
                            tutors.length == 0 &&
                            <div className="text-center mt-3">
                                <h3>{t('no_results')}</h3>
                            </div>
                        }
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
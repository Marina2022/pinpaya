import Container from "react-bootstrap/Container";
import {Badge, Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AxiosClient from "../axios-client";
import {CreditCard, CreditCardFill, Messenger, ShieldFillCheck, Star, StarFill} from "react-bootstrap-icons";
import moment from "moment";
import {useStateContext} from "../contexts/ContextProvider";
import $ from 'jquery';
import firebaseCreateChat from "../hooks/firebaseCreateChat";
import {AuthContext} from "../contexts/AuthContext";
import {v4 as uuid} from "uuid";
import InputMask from 'react-input-mask';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import chatNotif from "../hooks/chatNotif";
import {ChatContext} from "../contexts/ChatContext";
import {useTranslation} from "react-i18next";
export default function TutorPage(){
    let { id } = useParams();
    const [tutor, setTutor] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const {type, user} = useStateContext();
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const MySwal = withReactContent(Swal);
    const [data, setData] = useState({
        useWallet: 0,
        subject: '',
        note: '',
        card:'',
        exp:'',
        cvc:''
    });
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [newEvents, setNewEvents] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = () => {
        AxiosClient.get('/get-tutor/'+id).then(({data}) => {
            setTutor(data.tutor);
            setCertificates(data.certificates);
            setSchedule(data.schedule);
        })
        AxiosClient.post('get-schedule',{id:id}).then(({data}) => {
            setEvents(data.data);

        })
    }

    useEffect(() => {
        getData();
    }, [])

    const scrollTo = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    const handleSelect = (info) => {

            if(user && type == 'student'){
                setShow(true);
                setInfo(info);
            }else{
                window.alert('Please Log in as student')
            }

    };
    $('.fc-prev-button').click(function(){
        setZindex();
    });

    $('.fc-next-button').click(function(){
        setZindex();
    });
    $('.fc-today-button').click(function(){
        setZindex();
    });
    function setZindex(){
        setTimeout(function (){
            $('.holiday').parent().css("z-index", 20);
            $('.holiday').parent().css("width", '100%');
        });
    }
    setZindex();
    const remove = (element) => {
            if(user && type == 'student'){
                if(element.event.classNames[0] !== 'holiday'){
                    let el = events.filter(item => item.id == element.event.id);
                    if(el[0].studentId == user.id){
                        // if(window.confirm('Are you sure?')){
                        //
                        //     let id = element.event.id;
                        //     AxiosClient.post('/student/schedule-delete', {id:id}).then(({data}) => {
                        //         getData();
                        //     }).catch(err => {})
                        // }
                    }else{
                        if(element.event.classNames[0] != 'selectedEvents'){
                            if(user && type == 'student'){

                                // setInfo(element.event);
                                const {startStr, endStr} = element.event;

                                const newState = events.map(obj => {
                                    if (obj.id === element.event.id) {
                                        const temp =    {
                                            id: element.event.id,
                                            start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
                                            end: moment(startStr).add(1, 'hours').format('Y-MM-DD HH:mm:ss'),
                                            tutor_id: id
                                        };
                                        if(obj.backgroundColor == '#36ab36'){
                                            setSelected([
                                                ...selected,
                                                temp
                                            ]);
                                            return {...obj, backgroundColor: 'silver'};

                                        }else{
                                            setSelected(oldValues => {
                                                return oldValues.filter(item => item.id !== element.event.id)
                                            })
                                            return {...obj, backgroundColor: '#36ab36'};

                                        }
                                    }

                                    // 👇️ otherwise return the object as is
                                    return obj;
                                });

                                setEvents(newState);

                                // setSelected([
                                //     ...selected,
                                //         {
                                //             id: element.event.id,
                                //             start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
                                //             end: moment(startStr).add(1, 'hours').format('Y-MM-DD HH:mm:ss'),
                                //             tutor_id: id
                                //         }
                                //     ]
                                // )


                            }else{
                                window.alert('Please Log in as student')
                            }
                        }
                    }
                }
        }else{
            window.alert('Please Log in as student')
        }

    }

    const onSubmitCheckout = (e) =>{
        e.preventDefault();
        setLoading(true);

        // const {startStr, endStr} = info;
        // const payloadToSend = {
        //     start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
        //     end: moment(startStr).add(1, 'hours').format('Y-MM-DD HH:mm:ss'),
        //     tutor_id: id,
        //     subject_id: data.subject
        // }

        const payload = {
            selected: selected,
            subject_id: data.subject,
            tutor_id: id,
            data: data,
            amount: selected.length > 0 ? tutor.price * selected.length + 1 : tutor.price + 1,
            price: tutor.price
        }

        if(user && type == 'student' && selected.length > 0){
            AxiosClient.post('/student/schedule', payload).then(({data}) => {
                getData();
                setZindex();
                setSelected([]);
                handleClose();
                MySwal.fire({
                    icon: 'success',
                    text: t('done'),
                })


                chatNotif(data.notif, currentUser, tutor.email);

                setLoading(false);
            }).catch(err => {

                 setError(err.response.data.error);
                setLoading(false);
            })
        }
    }

    const message = () => {
        firebaseCreateChat(currentUser, tutor, user);
        document.getElementsByClassName('messageTrigger')[0].click();
    }

    const bookLessons = () => {
        setShow(true);
    }

    return(
        <>
            <Container className="tutor-page">
                    <Row className="my-5">
                        <Col lg={8}>
                            {
                                tutor.video_url &&
                                <Col lg={12}>
                                    <iframe src={tutor.video_url} style={{width:'100%', marginBottom:'15px',height:'400px'}} frameborder="0"></iframe>
                                </Col>
                            }
                            <div className="part-top p-4 border bg-white">
                                <Row>
                                    <Col lg={3} className=" d-flex align-items-start mt-3 justify-content-center">
                                        { tutor.avatar ?
                                            <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+tutor.avatar} alt="avatar"/>
                                            : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                                        }
                                    </Col>
                                    <Col lg={9}>
                                        <div className="mb-2">
                                            <div className="mt-2">
                                                <h3><b>{tutor.name} {tutor.lastname}</b></h3>
                                                { tutor.status == 0 &&
                                                    <h6 className="text-danger">Not accepting lessons</h6>
                                                }
                                            <span style={{color: '#666666', fontSize:'14px'}}>{tutor.location}</span>
                                            </div>

                                            <div className="mt-4" style={{display:'flex'}}>
                                                <span style={{width:'250px',flexShrink:'0'}} className="fw-bold tutor-page-desc">{t('teaches')}: </span>
                                                <div>
                                                    {tutor.subject && tutor.subject.map((item, index) => <span>{index != 0 ? ', ' : ''}{item.name }</span>)}
                                                </div>
                                            </div>
                                            <div style={{display:'flex'}}>
                                                <div style={{width:'250px',flexShrink:'0'}}  className="fw-bold tutor-page-desc">{t('experience')}: </div>
                                                <div>{tutor.experience}</div>
                                            </div>
                                            <div className="mb-2" style={{display:'flex'}}>
                                                    <div style={{width:'250px',flexShrink:'0'}}  className="fw-bold mb-2 tutor-page-desc">{t('speaks')}: </div>
                                                    <div>
                                                        { tutor.language && tutor.language.map((item, index) => <span>{index != 0 ? ', ' : ''}{item.name}</span>)}
                                                    </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="pt-1">
                                                    <span className="fw-bold mb-1">{t('about_me')}</span>
                                                    <p>{tutor.about}</p>
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="pt-1">
                                                    <span className="fw-bold mb-1">{t('teach_style')}</span>
                                                    <p>{tutor.description}</p>
                                                </div>
                                            </div>
                                            {
                                                tutor.check_trial == 1 &&
                                                <div>
                                                    <span className="fw-bold ">{t('trial_lesson')}: </span>
                                                    {t('first_lesson_50')}
                                                </div>
                                            }
                                            {
                                                tutor.check_teach == 1 &&
                                                <div>
                                                    <span className="fw-bold ">{t('teach_only_kids')} </span>
                                                </div>
                                            }

                                        </div>
                                    </Col>
                                </Row>
                                {
                                    certificates?.length > 0 &&
                                    <Row className="mt-5">
                                        <Col lg={3}></Col>
                                        <Col lg={7}>
                                            <h4 className="mb-3"><b>{t('certificates')}</b></h4>
                                            <div className="my-3 d-flex certificates-block">
                                                {
                                                    certificates?.length > 0 &&
                                                    certificates.map(item =>
                                                        <div className="border m-2" >
                                                            <a target="_blank" href={`https://web.pinpaya.com/storage/${item.images}`}><img style={{width:'150px', height: '150px', objectFit:'cover'}} className="img-fluid mx-2" key={item.id} src={'https://web.pinpaya.com/storage/'+item.images} width="150" alt=""/></a>
                                                        </div>

                                                    )}

                                            </div>
                                        </Col>
                                    </Row>
                                }

                            </div>
                            <div className="part-bottom mt-3 bg-white border">
                                <Row>
                                    <Col md={12}>
                                            <div className="p-4">
                                                <h4 className="fw-bold mb-2">{t('schedule_lessons')}</h4>
                                                <h6>{t('tutor_page_1')}</h6>
                                                <small>{t('tutor_page_2')}</small>
                                                <div className="d-flex m-2">
                                                    <div style={{background:'blue',height:'20px',width:'40px',marginRight:'10px'}}></div>
                                                    <div className="fw-bold ml-2">{t('booked_lessons')}</div>
                                                </div>
                                                <div className="d-flex m-2">
                                                    <div style={{background:'green',height:'20px',width:'40px',marginRight:'10px'}}></div>
                                                    <div className="fw-bold ml-2">{t('available_hours')}</div>
                                                </div>
                                                <div className="mt-4">
                                                    <FullCalendar
                                                        selectable
                                                        select={handleSelect}
                                                        // businessHours={schedule}
                                                        selectConstraint="businessHours"
                                                        eventOverlap={false}
                                                        selectOverlap={false}
                                                        events={events}
                                                        timeFormat='H(:mm)'
                                                        // events={schedule}
                                                        defaultView="timeGridWeek"
                                                        slotLabelFormat={{
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            omitZeroMinute: false,
                                                        }}
                                                        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
                                                        ignoreTimezone={true}
                                                        defaultAllDay={false}
                                                        eventTextColor='white'
                                                        eventClick={remove}
                                                        validRange={{
                                                            start: moment().add(24,'hours').format('Y-MM-DD HH:mm:ss'),
                                                            end: moment().add(3,'months').format('Y-MM-DD HH:mm:ss'),
                                                        }}
                                                        // forceEventDuration={true}
                                                        // defaultTimedEventDuration='02:00:00'
                                                        displayEventTime={false}
                                                        header={{
                                                            left: 'prev,next today',
                                                            center: 'title',
                                                            right: 'timeGridWeek,timeGridDay',
                                                        }}
                                                        slotDuration='01:00:00'
                                                        buttonText={{
                                                            today: t('today')
                                                        }}
                                                        locale={localStorage.getItem('i18next') || 'en'}
                                                        // timeZone='UTC'
                                                        allDaySlot={false}
                                                        // slotLabelInterval={30}
                                                    />
                                                    <div><button disabled={selected.length > 0 && tutor.status == 1 ? false : true} className="btn btn-lg border my-3" onClick={bookLessons}>{tutor.status == 0 ? '-' : t('schedule_lessons')}</button></div>
                                                </div>
                                            </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="p-5 border bg-white">
                                <h4 className="text-center"><span className="pr-4">{t('average_rating')}</span> <img src="/public/star12gold.svg" style={{width:'24px', marginRight: '10px'}} alt=""/> - </h4>
                                <div className="mt-3 justify-content-center align-items-center d-flex pr-2"><h2>{tutor.price} € </h2>
                                    {
                                        tutor.check_trial == 1 ?
                                        <span className="text-secondary" style={{marginLeft:'10px'}}>/{t('first_trial')}</span>
                                            : <span style={{fontSize:'12px', color:'silver', fontWeight:'bold', marginLeft:'10px'}}>/{t('per_hour')}</span>
                                    }

                                </div>
                                <button className="btn6 mt-3" onClick={scrollTo}>
                                    {t('schedule_lessons')}
                                </button>
                                <div className="d-flex mt-4 align-items-center">
                                    <div><img src="/public/learlogo.svg" style={{width:'40px',marginRight:'5px'}}/></div>
                                    <div>
                                        <div className="fw-bold mb-1">{t('tutor_page_3')}</div>
                                        <div>{t('tutor_page_4')}</div>
                                    </div>
                                </div>
                                { user &&
                                <button onClick={message} className="btn4 mt-4">
                                    <img src="/public/nchat.svg" style={{width:'24px', marginRight: '10px'}} alt=""/> {t('leave_first_review')}
                                </button>
                                 }
                                <button className="btn4 mb-4 mt-3">
                                    <img src="/public/star12.svg" style={{width:'24px', marginRight: '10px'}} alt=""/> {t('read_reviews')} (0)
                                </button>

                            </div>

                                { user &&
                                    <div className="p-5 border mt-3 bg-white">
                                        <button className="btn5">
                                            {t('leave_first_review')}
                                        </button>
                                    </div>
                                }

                        </Col>
                    </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={onSubmitCheckout}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('secure_checkout')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="d-flex justify-content-center align-items-center my-3">
                            { tutor.avatar ?
                                <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+tutor.avatar} alt="avatar"/>
                                : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                            }

                        </div>
                        <div className="mb-4 text-center fw-bold">{selected.length > 0 ? selected.length : 1} lesson with {tutor.name} {tutor.lastname}</div>
                        <div className="my-4">
                            <div className="d-flex justify-content-between">
                                <div className="fz-15">
                                    <div className="fw-bold mb-2">{t('service_detail')}</div>
                                    <div>{t('trial_lesson_price')}</div>
                                    <div>{t('processing_fee')}</div>
                                    <div className="mt-2 fz-18 fw-bold">{t('total')}</div>
                                </div>
                                <div className="fz-15">
                                    <div className="fw-bold m-2">{t('price')}</div>
                                    <div>{tutor.price} €</div>
                                    <div>1.00 €</div>
                                    <div className="mt-2 fz-18 fw-bold">{selected.length > 0 ? tutor.price * selected.length + 1 : tutor.price + 1} €</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Row>
                            <Col md={10}>
                                <Form.Group className="mb-3" controlId="13">
                                    <Form.Label className="fw-bold">{t('you_have')} <Badge style={{color:'black'}} bg="warning">{user?.wallet} €</Badge> {t('in_your_wallet')}</Form.Label>
                                    <Form.Control type="number"
                                                  value={data?.useWallet}
                                                  onChange={ev => setData({...data, useWallet : ev.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2} className="align-items-center d-flex"><Button className="btn btn-sm">{t('use')}</Button></Col>
                        </Row>
                    </div>
                    <div className="p-2 mb-4 mt-1" style={{background:'#dfdcde'}}>
                        <div className="mb-4 text-dark"><CreditCardFill size={26}/>{t('paypal_info')} </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cc-number" className="text-dark">{t('card_number')} *</label>
                                <InputMask
                                    mask='9999 9999 9999 9999'
                                    placeholder='XXXX XXXX XXXX XXXX'
                                    required
                                    onChange={ev => setData({...data, card : ev.target.value})}
                                >
                                </InputMask>
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>

                            </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-expiration" className="text-dark">{t('expiry_date')} *</label>
                                    <InputMask
                                        mask='99/99'
                                        onChange={ev => setData({...data, exp : ev.target.value})}
                                        required
                                        placeholder='MM/YY'>
                                    </InputMask>
                                        <div className="invalid-feedback">
                                            Expiration date required
                                        </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-expiration" className="text-dark">{t('card_code')} *</label>
                                    <InputMask
                                        mask='999'
                                        onChange={ev => setData({...data, cvc : ev.target.value})}
                                        required
                                        placeholder='XXX'>
                                    </InputMask>
                                        <div className="invalid-feedback">
                                            Security code required
                                        </div>
                                </div>
                        </div>
                        <div className="custom-control custom-checkbox d-flex justify-content-around">
                            <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address1" />
                            <label className="custom-control-label text-dark" htmlFor="same-address1"><b>{t('card_info_1')}</b></label>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox d-flex justify-content-around">
                        <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address2" />
                        <label className="custom-control-label" htmlFor="same-address2"><b>{t('card_info_2')} *</b></label>
                    </div>
                    <Form.Group className="mb-3 mt-3" controlId="12">
                        <Form.Label className="fw-bold">{t('what_study')}</Form.Label>
                        <Form.Select required
                                     value={data?.subject}
                                     onChange={ev => setData({...data, subject : ev.target.value})}
                        >
                            <option value="">{t('select_subject')}</option>
                            {   tutor.subject &&
                                tutor.subject.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="13">
                        <Form.Label className="fw-bold">{t('note_private_teacher')}</Form.Label>
                        <Form.Control as="textarea" rows={3}
                                      value={data?.note}
                                      onChange={ev => setData({...data, note : ev.target.value})}
                                      placeholder={t('note_private_teacher_placeholder')}
                        />
                    </Form.Group>
                    {error &&
                        <div className="text-danger"><b>{error}</b></div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">{t('loading')}...</span>
                            </Spinner>
                            ) : t('confirm')
                        }

                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

import Container from "react-bootstrap/Container";
import {Badge, Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
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
export default function TutorPage(){
    let { id } = useParams();
    const [tutor, setTutor] = useState([]);
    const [schedule, setSchedule] = useState([]);
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
    const navigate = useNavigate();
    const [newEvents, setNewEvents] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = () => {
        AxiosClient.get('/get-tutor/'+id).then(({data}) => {
            setTutor(data.tutor);
            setSchedule(data.schedule);
        })
        AxiosClient.post('get-schedule',{id:id}).then(({data}) => {
            setEvents(data.data);

        })
    }

    useEffect(() => {
        getData();
    }, [])

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
                        if(window.confirm('Are you sure?')){

                            let id = element.event.id;
                            AxiosClient.post('/student/schedule-delete', {id:id}).then(({data}) => {
                                getData();
                            }).catch(err => {})
                        }
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
                    text: 'Done',
                })

                setLoading(false);
            }).catch(err => {

                 setError(err.response.data.error);
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
                        <Col md="8 border">
                            <div className="part-top p-2">
                                <Row>
                                    <Col md="3" className=" d-flex align-items-center justify-content-center">
                                        { tutor.avatar ?
                                            <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+tutor.avatar} alt="avatar"/>
                                            : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                                        }
                                    </Col>
                                    <Col md="9">
                                        <div className="mb-2">
                                            <div className="mt-2">
                                                <h4>{tutor.name} {tutor.lastname}</h4>
                                                <span className="fw-bold ">Location: </span>
                                                 {tutor.location}
                                            </div>
                                            <div>
                                                <span className="fw-bold ">Experience: </span>
                                                {tutor.experience}
                                            </div>
                                            <div className="pt-2">
                                                <span className="fw-bold ">Teaches:</span>
                                                {tutor.subject && tutor.subject.map(item => <span className="pills">{item.name }</span>)}
                                            </div>
                                            <div className="mb-2">
                                                <div className="pt-2">
                                                    <span className="fw-bold mb-2">Speaks:</span>
                                                    { tutor.language && tutor.language.map(item => <span className="pills">{item.name}</span>)}
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="pt-1">
                                                    <span className="fw-bold mb-1">About me</span>
                                                    <p>{tutor.about}</p>
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="pt-1">
                                                    <span className="fw-bold mb-1">My lessons & teaching style</span>
                                                    <p>{tutor.description}</p>
                                                </div>
                                            </div>
                                            {
                                                tutor.check_trial == 1 &&
                                                <div>
                                                    <span className="fw-bold ">Trial lesson: </span>
                                                    First lesson -50%
                                                </div>
                                            }
                                            {
                                                tutor.check_teach == 1 &&
                                                <div>
                                                    <span className="fw-bold ">Teach only kids </span>
                                                </div>
                                            }

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="part-bottom mt-5">
                                <Row>
                                    <Col md="12">
                                            <>
                                                <h4 className="fw-bold mb-2">Schedule lessons</h4>
                                                <h6>1 trial lesson with -50% discount for each new student, select a time below and let's get started</h6>
                                                <small>The timings are displayed in your local timezone.</small>
                                                <div className="d-flex m-2">
                                                    <div style={{background:'blue',height:'20px',width:'40px',marginRight:'10px'}}></div>
                                                    <div className="fw-bold ml-2">Booked Lessons</div>
                                                </div>
                                                <div className="d-flex m-2">
                                                    <div style={{background:'green',height:'20px',width:'40px',marginRight:'10px'}}></div>
                                                    <div className="fw-bold ml-2">Available Hours (Click and select time)</div>
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
                                                            end: moment().add(1,'months').format('Y-MM-DD HH:mm:ss'),
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
                                                        locale='en-GB'
                                                        // timeZone='UTC'
                                                        allDaySlot={false}
                                                        // slotLabelInterval={30}
                                                    />
                                                    <div><button disabled={selected.length > 0 ? false : true} className="btn btn-lg border my-3" onClick={bookLessons}>Book lessons</button></div>
                                                </div>
                                            </>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="p-5 border">
                                <h4 className="text-center"><span className="pr-4">Average rating</span> <StarFill  color="gold" /> </h4>
                                <div className="mt-3 justify-content-center align-items-center d-flex pr-2"><h2>{tutor.price} € </h2>
                                    {
                                        tutor.check_trial == 1 &&
                                        <span className="text-secondary">/first trial lesson</span>
                                    }

                                </div>
                                <div className="d-flex mt-4 align-items-center">
                                    <div><ShieldFillCheck color="gold" size={28}/></div>
                                    <div>
                                        <div className="fw-bold mb-1">Learn with 100% refund guarantee</div>
                                        <div>If your lesson does not take place, or you are not satisfied with the tutor, we will provide you a full refund.</div>
                                    </div>
                                </div>
                                { user &&
                                <button onClick={message} className="btn btn-secondary w-100 mt-5 d-flex justify-content-center align-items-center">
                                    <Messenger/> MESSAGE
                                </button>
                                 }
                                <button className="btn btn-secondary w-100 mt-3 d-flex justify-content-center align-items-center">
                                    <Star/> READ REVIEWS (0)
                                </button>
                                { user &&
                                    <button className="btn btn-secondary w-100 mt-5 d-flex justify-content-center align-items-center">
                                        <Star/> LEAVE FIRST  REVIEW
                                    </button>
                                }
                            </div>
                        </Col>
                    </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={onSubmitCheckout}>
                <Modal.Header closeButton>
                    <Modal.Title>Secure Checkout</Modal.Title>
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
                                    <div className="fw-bold mb-2">Service details</div>
                                    <div>Trial lesson price</div>
                                    <div>Processing fee</div>
                                    <div className="mt-2 fz-18 fw-bold">Total</div>
                                </div>
                                <div className="fz-15">
                                    <div className="fw-bold m-2">Price</div>
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
                                    <Form.Label className="fw-bold">You have <Badge>{user?.wallet} €</Badge> in your wallet</Form.Label>
                                    <Form.Control type="number"
                                                  value={data?.useWallet}
                                                  onChange={ev => setData({...data, useWallet : ev.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2} className="align-items-center d-flex"><Button className="btn btn-sm">USE</Button></Col>
                        </Row>
                    </div>
                    <div className="p-2 mb-4 mt-1" style={{background:'#5b08a7'}}>
                        <div className="mb-4 text-white"><CreditCardFill size={26}/>Pay with your credit card via Stripe. </div>
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label htmlFor="cc-number" className="text-white">Card Number *</label>
                                <InputMask
                                    mask='9999 9999 9999 9999'
                                    placeholder='XXXX XXXX XXXX XXXX'
                                    required
                                    onChange={ev => setData({...data, card : ev.target.value})}
                                >
                                </InputMask>
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>

                            </div>
                                <div class="col-md-6 mb-3">
                                    <label htmlFor="cc-expiration" className="text-white">Expiry Date *</label>
                                    <InputMask
                                        mask='99/99'
                                        onChange={ev => setData({...data, exp : ev.target.value})}
                                        required
                                        placeholder='MM/YY'>
                                    </InputMask>
                                        <div class="invalid-feedback">
                                            Expiration date required
                                        </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label htmlFor="cc-expiration" className="text-white">Card Code (CVC) *</label>
                                    <InputMask
                                        mask='999'
                                        onChange={ev => setData({...data, cvc : ev.target.value})}
                                        required
                                        placeholder='XXX'>
                                    </InputMask>
                                        <div class="invalid-feedback">
                                            Security code required
                                        </div>
                                </div>
                        </div>
                        <div class="custom-control custom-checkbox d-flex justify-content-around">
                            <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address1" />
                            <label className="custom-control-label text-white" htmlFor="same-address1"><b>Save payment information to my account for future purchases.</b></label>
                        </div>
                    </div>
                    <div class="custom-control custom-checkbox d-flex justify-content-around">
                        <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address2" />
                        <label className="custom-control-label" htmlFor="same-address2"><b>By checking this box you agree to Pinpaya Terms of use & General conditions *</b></label>
                    </div>
                    <Form.Group className="mb-3 mt-3" controlId="12">
                        <Form.Label className="fw-bold">What do you want to study?</Form.Label>
                        <Form.Select required
                                     value={data?.subject}
                                     onChange={ev => setData({...data, subject : ev.target.value})}
                        >
                            <option value="">Select subject</option>
                            {   tutor.subject &&
                                tutor.subject.map(({ id, name }) => (
                                    <option value={id}>{name}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="13">
                        <Form.Label className="fw-bold">Note to private teacher (optional)</Form.Label>
                        <Form.Control as="textarea" rows={3}
                                      value={data?.note}
                                      onChange={ev => setData({...data, note : ev.target.value})}
                                      placeholder="Tell the tutor about your goals and what exactly you want to learn"
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
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            ) : 'Confirm'
                        }

                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
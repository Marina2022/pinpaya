import Container from "react-bootstrap/Container";
import {Badge, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AxiosClient from "../axios-client";
import { Messenger, ShieldFillCheck, Star, StarFill} from "react-bootstrap-icons";
import moment from "moment";
import {useStateContext} from "../contexts/ContextProvider";
import $ from 'jquery';
export default function TutorPage(){
    let { id } = useParams();
    const [tutor, setTutor] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [events, setEvents] = useState([]);
    const {type, user} = useStateContext();
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState([]);
    const [data, setData] = useState({
        useWallet: 0,
        subject: '',
        note: ''
    });

    const [newEvents, setNewEvents] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        AxiosClient.get('/get-tutor/'+id).then(({data}) => {
            setTutor(data.tutor);
            setSchedule(data.schedule);
        })
        AxiosClient.post('get-schedule',{id:id}).then(({data}) => {
            setEvents(data.data);

        })
    }, [])

    const handleSelect = (info) => {
        if(isAnOverlapEvent(info.start, info.end) == true){
            window.alert('You cant use this date, It`s overlapping another event');
        }else{
            if(user && type == 'student'){
                setShow(true);
                setInfo(info);
            }else{
                window.alert('Please Log in as student')
            }
        }


    };
    const remove = (element) => {
        if(user && type == 'student'){
            let el = events.filter(item => item.id == element.event.id);
            if(el[0].studentId == user.id){
                if(window.confirm('Are you sure?')){
                    let id = element.event.id;
                    AxiosClient.post('/student/schedule-delete', {id:id}).then(({data}) => {
                        setEvents(current =>
                            current.filter(employee => {
                                return employee.id != id;
                            })
                        );

                    }).catch(err => {})
                }
            }
        }
    }

    function isAnOverlapEvent(eventStartDay, eventEndDay) {

        eventStartDay = moment(eventStartDay).format('Y-MM-DD HH:mm:ss');
        eventEndDay = moment(eventEndDay).add(2, 'hours').format('Y-MM-DD HH:mm:ss');

        for (let i = 0; i < events.length; i++) {

            let eventA = events[i];

            let eventStartDayDate = moment(eventStartDay).format('Y-MM-DD');
            let eventADate = moment(eventA.start).format('Y-MM-DD');

            if(eventStartDayDate == eventADate){

                // start-time in between any of the events
                if (moment(eventStartDay).isAfter(eventA.start) && moment(eventStartDay).isBefore(eventA.end)) {
                    console.log("start-time in between any of the events")
                    return true;
                }
                //end-time in between any of the events
                if (moment(eventEndDay).isAfter(eventA.start) && moment(eventEndDay).isBefore(eventA.end)) {
                    console.log("end-time in between any of the events")
                    return true;
                }
                //any of the events in between/on the start-time and end-time
                if (moment(eventStartDay).isSameOrBefore(eventA.start) && moment(eventEndDay).isSameOrAfter(eventA.end)) {
                    console.log("any of the events in between/on the start-time and end-time")
                    return true;
                }
            }

        }
        return false;
    }
    const eventRender = (info) => {
            info.el.querySelectorAll('.fc-title')[0].innerHTML = info.el.querySelectorAll('.fc-title')[0].innerText;
        }
    const onSubmitCheckout = (e) =>{
        e.preventDefault();

        const {startStr, endStr} = info;

        const payloadToSend = {
            start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
            end: moment(startStr).add(2, 'hours').format('Y-MM-DD HH:mm:ss'),
            tutor_id: id,
            subject_id: data.subject
        }

        if(user && type == 'student'){
            handleClose();
            AxiosClient.post('/student/schedule', payloadToSend).then(({data}) => {
                setEvents([
                    ...events,
                    {
                        id: data.id,
                        start: data.start,
                        end: data.end,
                        studentId: data.studentId,
                        title: user?.name
                    }
                ])
            }).catch(err => {})
        }
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
                                                        businessHours={schedule}
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
                                                            start: moment().add(3,'hours').format('Y-MM-DD HH:mm:ss'),
                                                            end: moment().add(6,'months').format('Y-MM-DD HH:mm:ss'),
                                                        }}
                                                        // forceEventDuration={true}
                                                        // defaultTimedEventDuration='02:00:00'
                                                        header={{
                                                            left: 'prev,next today',
                                                            center: 'title',
                                                            right: 'timeGridWeek,timeGridDay',
                                                        }}
                                                        locale='en-GB'
                                                        // timeZone='UTC'
                                                        allDaySlot={false}
                                                        eventRender={eventRender}
                                                        // slotLabelInterval={30}
                                                    />
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
                                <button className="btn btn-secondary w-100 mt-5 d-flex justify-content-center align-items-center">
                                 <Messenger/> MESSAGE
                                </button>
                                <button className="btn btn-secondary w-100 mt-3 d-flex justify-content-center align-items-center">
                                    <Star/> READ REVIEWS (0)
                                </button>
                                <button className="btn btn-secondary w-100 mt-5 d-flex justify-content-center align-items-center">
                                    <Star/> LEAVE FIRST  REVIEW
                                </button>
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
                        <div className="mb-4 text-center fw-bold">1 lesson with {tutor.name} {tutor.lastname}</div>
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
                                    <div className="mt-2 fz-18 fw-bold">{tutor.price + 1} €</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
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
                    <Form.Group className="mb-3" controlId="12">
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Confirm
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
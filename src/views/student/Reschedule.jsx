import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Container from "react-bootstrap/Container";
import {Badge, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment/moment";
import {useStateContext} from "../../contexts/ContextProvider";
import AxiosClient from "../../axios-client";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {InfoCircle} from "react-bootstrap-icons";
import $ from "jquery";


export default function Reschedule(){
    const MySwal = withReactContent(Swal);
    const [lessons, setLessons] = useState([]);
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(false);
    const [oldId, setOldId] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [events, setEvents] = useState([]);
    const {type, user} = useStateContext();
    const handleClose = () => setShow(false);

    const getReschedule = () => {
        axiosClient.get('student/get-reschedule/'+id).then(({data}) => {
            setLessons(data.lessons);
        }).catch(err => {})
    }
    useEffect(() => {
        getReschedule();
    }, [])

    const reschedule = (start_time, tutor_id, old_id) => {
        setStart(start_time);
        setOldId(old_id);
        AxiosClient.get('/get-tutor/'+tutor_id).then(({data}) => {
            setSchedule(data.schedule);
        })
        AxiosClient.post('get-schedule',{id:tutor_id}).then(({data}) => {
            setEvents(data.data);
        })
        setShow(true);
    }

    const handleSelect = (element) => {
            if(user && type == 'student'){
                if(element.event.classNames[0] !== 'holiday' && element.event.classNames[0] != 'selectedEvents'){
                    const {startStr, endStr} = element.event;

                    const payloadToSend = {
                        start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
                        end: moment(startStr).add(1, 'hours').format('Y-MM-DD HH:mm:ss'),
                        tutor_id: id,
                        old_id: oldId
                    }

                    AxiosClient.post('/student/schedule', payloadToSend).then(({data}) => {
                        MySwal.fire({
                            icon: 'success',
                            text: 'Date changed',
                        })
                        getReschedule();
                        setShow(false);

                    }).catch(err => {
                        MySwal.fire({
                            icon: 'error',
                            text: 'Something went wrong!',
                        })
                    })
                }
            }



    };

    function setZindex(){
        setTimeout(function (){
            $('.holiday').parent().css("z-index", 20);
            $('.holiday').parent().css("width", '100%');
        });
    }
    setZindex();

    $('.fc-prev-button').click(function(){
        setZindex();
    });

    $('.fc-next-button').click(function(){
        setZindex();
    });
    $('.fc-today-button').click(function(){
        setZindex();
    });

    return(
        <>
            <Container>
                <div className="mb-5">
                    <h2 className="mb-4">Reschedule</h2>
                    {
                        lessons?.length > 0 ?
                            (
                                lessons.map(item =>
                                    <Col >
                                        <div className="my-3 border p-3" >

                                            <Row>
                                                <Col md={4}><div><b>{item.start_time}</b></div></Col>
                                                <Col md={4}>
                                                    <div>Tutor: <b>{item.tutor.name}</b></div>
                                                    {
                                                        item.reschedule == 1 &&
                                                        <div className="text-danger">Appointment has been canceled</div>
                                                    }
                                                </Col>
                                                <Col md={4}>  <button className="btn btn-danger" onClick={() => reschedule(item.start_time, item.tutor_id, item.id)}>RESCHEDULE</button></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                )
                            ) : (
                                <h4 className="d-flex align-items-center text-primary"><InfoCircle/> Appointments are empty</h4>
                            )}
                </div>
            </Container>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Select new date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FullCalendar
                        selectable
                        eventClick={handleSelect}
                        // businessHours={schedule}
                        displayEventTime={false}
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
                        slotDuration='01:00:00'
                        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
                        ignoreTimezone={true}
                        defaultAllDay={false}
                        eventTextColor='white'
                        validRange={{
                            start: moment().add(24,'hours').format('Y-MM-DD HH:mm:ss'),
                            end: moment().add(1,'months').format('Y-MM-DD HH:mm:ss'),
                        }}
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'timeGridWeek,timeGridDay',
                        }}
                        locale='en-GB'
                        allDaySlot={false}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}
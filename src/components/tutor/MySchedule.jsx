import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {useEffect, useRef, useState} from "react";
import AxiosClient from "../../axios-client";
import {Button, Col, Form, Row} from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import useMounted from "../../hooks/useMounted";
import moment from "moment/moment";
import FullCalendarTutor from "../FullCalendarTutor";
import $ from "jquery";
import {useTranslation} from "react-i18next";

export default function MySchedule() {
    const mounted = useMounted();
    const [events, setEvents] = useState([]);
    const [booked, setBooked] = useState([]);
    const [form, setForm] = useState([]);
    const [success, setSuccess] = useState(null);
    const [showBlock, setShowBlock] = useState(1);

    const [refSundayFrom, setRefSundayFrom] = useState(0);
    const [refSundayTo, setRefSundayTo] = useState(82800);
    const [refMondayFrom, setRefMondayFrom] = useState(0);
    const [refMondayTo, setRefMondayTo] = useState(82800);
    const [refTuesdayFrom, setRefTuesdayFrom] = useState(0);
    const [refTuesdayTo, setRefTuesdayTo] = useState(82800);
    const [refWednesdayFrom,setRefWednesdayFrom ] = useState(0);
    const [refWednesdayTo, setRefWednesdayTo] = useState(82800);
    const [refThursdayFrom, setRefThursdayFrom] = useState(0);
    const [refThursdayTo, setRefThursdayTo] = useState(82800);
    const [refFridayFrom, setRefFridayFrom] = useState(0);
    const [refFridayTo, setRefFridayTo] = useState(82800);
    const [refSaturdayFrom, setRefSaturdayFrom] = useState(0);
    const [refSaturdayTo, setRefSaturdayTo] = useState(82800);
    const {t, i18n} = useTranslation();
    const getSchedule = () => {

        AxiosClient.get('/tutor/get-schedule').then(({data}) => {
            setEvents(data.data);
            setForm(data.form);
            setBooked(data.booked);

            setRefSundayFrom(data.form.refSundayFrom)
            setRefSundayTo(data.form.refSundayTo)
            setRefMondayFrom(data.form.refMondayFrom)
            setRefMondayTo(data.form.refMondayTo)
            setRefTuesdayFrom(data.form.refTuesdayFrom)
            setRefTuesdayTo(data.form.refTuesdayTo)
            setRefWednesdayFrom(data.form.refWednesdayFrom)
            setRefWednesdayTo(data.form.refWednesdayTo)
            setRefThursdayFrom(data.form.refThursdayFrom)
            setRefThursdayTo(data.form.refThursdayTo)
            setRefFridayFrom(data.form.refFridayFrom)
            setRefFridayTo(data.form.refFridayTo)
            setRefSaturdayFrom(data.form.refSaturdayFrom)
            setRefSaturdayTo(data.form.refSaturdayTo)
        })
    }

    useEffect(() => {
        getSchedule();
    }, [])


    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            refSundayFrom,
            refSundayTo ,
            refMondayFrom ,
            refMondayTo ,
            refTuesdayFrom ,
            refTuesdayTo ,
            refWednesdayFrom ,
            refWednesdayTo ,
            refThursdayFrom ,
            refThursdayTo ,
            refFridayFrom ,
            refFridayTo ,
            refSaturdayFrom,
            refSaturdayTo
        }
        setSuccess(null);

        AxiosClient.post('tutor/set-tutor-week', payload).then(({data}) => {
            setSuccess(true);
            getSchedule();
        })
    }
    const onSetHoliday = () => {
        getSchedule();
    }

    function setZindex(){
        setTimeout(function (){
            $('.selectedEvents').parent().css("z-index", 10);
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


    return (
        <div className="bg-white p-4">
            <div>
                {success &&
                    <div className='success-block mt-3'>
                        <p>Update is done</p>
                    </div>
                }
                <div>
                    <button className="mb-4 schedule-btn btn btn-secondary" onClick={() => setShowBlock(1)}>{t('set_your_schedule')}</button>
                    <button className="mb-4 btn btn-secondary" onClick={() => setShowBlock(2)}>{t('set_your_holidays')}</button>
                </div>
                {
                    showBlock == 1 ? (
                    <>
                        <Form onSubmit={onSubmit} className="mb-4">
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('sunday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refSundayFrom} onChange={val => setRefSundayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refSundayTo} onChange={val => setRefSundayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('monday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refMondayFrom} onChange={val => setRefMondayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refMondayTo} onChange={val => setRefMondayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('tuesday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refTuesdayFrom} onChange={val => setRefTuesdayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refTuesdayTo} onChange={val => setRefTuesdayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('wednesday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refWednesdayFrom} onChange={val => setRefWednesdayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refWednesdayTo} onChange={val => setRefWednesdayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('thursday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refThursdayFrom} onChange={val => setRefThursdayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refThursdayTo} onChange={val => setRefThursdayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('friday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refFridayFrom} onChange={val => setRefFridayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refFridayTo} onChange={val => setRefFridayTo(val)}/>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label>{t('saturday')}</Form.Label>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refSaturdayFrom} onChange={val => setRefSaturdayFrom(val)}/>
                                        <TimePicker format={24} start="00:00" end="23:00" step={60} value={refSaturdayTo} onChange={val => setRefSaturdayTo(val)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="my-3" type="submit"> {t('confirm')} </Button>
                        </Form>
                        <div className="d-flex m-2">
                            <div style={{background:'blue',height:'20px',width:'40px',marginRight:'10px'}}></div>
                            <div className="fw-bold ml-2">{t('booked_lessons')}</div>
                        </div>
                        <div className="d-flex m-2">
                            <div style={{background:'green',height:'20px',width:'40px',marginRight:'10px'}}></div>
                            <div className="fw-bold ml-2">{t('available_hours')}</div>
                        </div>
                        <FullCalendar
                            // selectable
                            events={booked}
                            // businessHours={events}
                            defaultView="daysOfWeek"
                            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
                            // defaultTimedEventDuration='02:00'
                            validRange={{
                                start: moment().add(3,'hours').format('Y-MM-DD HH:mm:ss'),
                                end: moment().add(1,'months').format('Y-MM-DD HH:mm:ss'),
                            }}
                            ignoreTimezone={true}
                            defaultAllDay={false}
                            eventTextColor='white'
                            allDaySlot={false}
                            buttonText={{
                                today: t('today')
                            }}
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridWeek,timeGridDay',
                            }}
                            displayEventTime={false}
                            selectConstraint="businessHours"
                            eventOverlap={false}
                            selectOverlap={false}
                            locale={localStorage.getItem('i18next') || 'en'}
                            slotDuration='01:00:00'
                            slotLabelFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                omitZeroMinute: false,
                            }}
                        />
                    </>
                    ) : (
                        <>
                            <h3 className="mb-3">{t('select_holiday')}</h3>
                            <FullCalendarTutor onSetHoliday={onSetHoliday}></FullCalendarTutor>
                        </>
                    )
                }

            </div>
        </div>
    );
};

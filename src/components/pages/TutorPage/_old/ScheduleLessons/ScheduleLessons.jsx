import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment/moment";
import $ from "jquery";

const remove = (element) => {
  if (user && type == 'student') {
    if (element.event.classNames[0] !== 'holiday') {
      let el = events.filter(item => item.id == element.event.id);
      if (el[0].studentId == user.id) {
      } else {
        if (element.event.classNames[0] != 'selectedEvents') {
          if (user && type == 'student') {

            const {startStr, endStr} = element.event;
            const newState = events.map(obj => {
              if (obj.id === element.event.id) {
                const temp = {
                  id: element.event.id,
                  start: moment(startStr).format('Y-MM-DD HH:mm:ss'),
                  end: moment(startStr).add(1, 'hours').format('Y-MM-DD HH:mm:ss'),
                  tutor_id: id
                };
                if (obj.backgroundColor == '#36ab36') {
                  setSelected([
                    ...selected,
                    temp
                  ]);
                  return {...obj, backgroundColor: 'silver'};

                } else {
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

          } else {
            window.alert('Please Log in as student')
          }
        }
      }
    }
  } else {
    window.alert('Please Log in as student')
  }

}

const ScheduleLessons = () => {



  const handleSelect = (info) => {

    if (user && type == 'student') {
      setShow(true);
      setInfo(info);
    } else {
      window.alert('Please Log in as student')
    }

  };


  $('.fc-prev-button').click(function () {
    setZindex();
  });

  $('.fc-next-button').click(function () {
    setZindex();
  });
  $('.fc-today-button').click(function () {
    setZindex();
  });

  function setZindex() {
    setTimeout(function () {
      $('.holiday').parent().css("z-index", 20);
      $('.holiday').parent().css("width", '100%');
    });
  }

  setZindex();


  return (
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
  );
};

export default ScheduleLessons;

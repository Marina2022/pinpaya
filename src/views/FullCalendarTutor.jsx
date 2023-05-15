import FullCalendar2 from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {useEffect, useState} from "react";
import AxiosClient from "../axios-client";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment/moment";
export default function FullCalendarTutor({ onSetHoliday}){
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        AxiosClient.post('/tutor/get-holidays', ).then(({data}) => {
            setHolidays(data.holidays)
        }).catch(err => {})
    }, [])
    const handleSelect = (info) => {
        const {dateStr} = info;

        AxiosClient.post('/tutor/schedule', {start:dateStr}).then(({data}) => {
            if(data.message == true){
                setHolidays([
                    ...holidays,
                    {
                        start: dateStr,
                        allDay: true,
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                        title:'holiday',
                        id: data.id,
                    }
                ])
                onSetHoliday();
            }

        }).catch(err => {})

    };
    const remove = (element) => {
            if(window.confirm('Are you sure?')){
                let id = element.event.id;
                AxiosClient.post('/tutor/delete-holiday', {id:id}).then(({data}) => {
                    setHolidays(current =>
                        current.filter(employee => {
                            return employee.id != id;
                        })
                    );

                }).catch(err => {})
                setTimeout(function (){
                    onSetHoliday();
                }, 2000)
            }


    }

    return(
        <>
            <FullCalendar2
                selectable
                initialView="dayGridMonth"
                events={holidays}
                dateClick={handleSelect}
                eventClick={remove}
                dayMaxEvents={1}
                eventLimitText="Already selected"
                plugins={[dayGridPlugin, interactionPlugin]}
                header={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                }}
                validRange={{
                    start: moment().add(3,'hours').format('Y-MM-DD'),
                    end: moment().add(6,'months').format('Y-MM-DD'),
                }}
                ignoreTimezone={true}
                locale='en'
            />
        </>
    )
}
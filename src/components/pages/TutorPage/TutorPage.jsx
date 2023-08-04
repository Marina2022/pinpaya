import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AxiosClient from "../../../axios-client";
import {useStateContext} from "../../../contexts/ContextProvider";
import firebaseCreateChat from "../../../hooks/firebaseCreateChat";
import {AuthContext} from "../../../contexts/AuthContext";

import {useTranslation} from "react-i18next";
import BookingDetails from "./BookingDetails/BookingDetails";
import TutorVideo from "./TutorVideo/TutorVideo";
import TutorDesc from "./TutorDesc/TutorDesc";
import cn from "classnames";

import s from './TutorPage.module.scss'
import ScheduleLessons from "./ScheduleLessons/ScheduleLessons";

export default function TutorPage() {
  let {id} = useParams();
  const [tutor, setTutor] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [events, setEvents] = useState([]);

  const {type, user} = useStateContext();

  const {t, i18n} = useTranslation();


  const getData = () => {
    AxiosClient.get('/get-tutor/' + id).then(({data}) => {
      console.log('data', data)
      setTutor(data.tutor);
      setCertificates(data.certificates);
      setSchedule(data.schedule);
    })
    AxiosClient.post('get-schedule', {id: id}).then(({data}) => {
      setEvents(data.data);

    })
  }

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getData();

  }, [])

  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);

  return (
    <div className={cn('container-1312', s.tutorPage)}>

      <div className={s.leftWrapper}>
        {
          tutor.video_url && <TutorVideo tutor={tutor}/>
        }
        <TutorDesc tutor={tutor} certificates={certificates}/>

        <ScheduleLessons events={events} setEvents={setEvents} tutor={tutor}  selected={selected} setSelected={setSelected} setShow={setShow}/>
      </div>

      <div className={s.rightWrapper}>
        <BookingDetails tutor={tutor} getData={getData} selected={selected} setSelected={setSelected} show={show} setShow={setShow}/>
      </div>
    </div>
  )
}

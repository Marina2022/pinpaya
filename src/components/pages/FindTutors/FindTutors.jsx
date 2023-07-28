import {Col, Row, Spinner} from "react-bootstrap";
import React, { useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import {useTranslation} from "react-i18next";

import s from './FindTutors.module.scss'
import TutorCard from "./TutorCard/TutorCard";
import FindTutorFilters from "./FindTutorFilters/FindTutorFilters";
import NoticeList from "./NoticeList/NoticeList";
import FindTutorsFiltersMobile from "./FindTutorsFiltersMobile/FindTutorsFiltersMobile";

export default function FindTutors() {
  const [tutors, setTutors] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    axiosClient.get('/get-tutors').then(({data}) => {
      setTutors(data.data);
    })
    axiosClient.get('/get-form-fields').then(({data}) => {
      setSubjects(data.subjects);
      setLanguages(data.languages);
    })

  }, [])

  console.log('tutors',tutors)

  return (

    <div className='container'>

      <h2 className={s.mainTitle}>{t('find_private_tutor')}</h2>
      <NoticeList/>
      <FindTutorsFiltersMobile setLoading={setLoading} setTutors={setTutors} subjects={subjects} languages={languages}
                               loading={loading}/>
      <div className={s.globalWrapper}>
        <div className={s.filters}>
          <FindTutorFilters setLoading={setLoading} setTutors={setTutors} subjects={subjects} languages={languages}
                            loading={loading} classname={s.filtersInner} />
        </div>

        <section className={s.cards}>
          {
            tutors.length > 0 &&
            loading ?
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              :
              tutors.map((item, index) => <TutorCard item={item} key={item.id}/>
              )
          }
          {
            tutors.length === 0 &&
            <div className="text-center mt-3">
              <h3>{t('no_results')}</h3>
            </div>
          }
        </section>
      </div>
    </div>
  )
}

import {Col, Row, Spinner} from "react-bootstrap";
import React, { useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import {useTranslation} from "react-i18next";

import s from './FindTutors.module.scss'
import TutorCard from "./TutorCard/TutorCard";
import FindTutorFilters from "./FindTutorFilters/FindTutorFilters";

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


  return (

    <div className='container'>
      <h3 className="fw-bold my-5">{t('find_private_tutor')}</h3>
      <Row className="mb-5">
        <Col md={3}><img src="/public/find1.svg" style={{width: '40px', marginRight: '10px'}}/>{t('find_tutor_text1')}
        </Col>
        <Col md={3}><img src="/public/find2.svg" style={{width: '40px', marginRight: '10px'}}/> {t('find_tutor_text2')}
        </Col>
        <Col md={3}><img src="/public/find3.svg" style={{width: '40px', marginRight: '10px'}}/> {t('find_tutor_text3')}
        </Col>
        <Col md={3}><img src="/public/find4.svg" style={{width: '40px', marginRight: '10px'}}/> {t('find_tutor_text4')}
        </Col>
      </Row>

      <div className={s.globalWrapper}>
        <div className={s.filters}>
          <FindTutorFilters setLoading={setLoading} setTutors={setTutors} subjects={subjects} languages={languages}
                            loading={loading}/>
        </div>

        <div className={s.cards}>
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
        </div>
      </div>
    </div>
  )
}

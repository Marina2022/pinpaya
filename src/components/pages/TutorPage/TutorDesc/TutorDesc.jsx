import React from 'react';
import {useTranslation} from "react-i18next";

import s from './TutorDesc.module.scss'

const TutorDesc = ({tutor, certificates}) => {
  const {t, i18n} = useTranslation();

  return (

    <>
      <div className={s.tutorDesc}>

        <img className={s.ava}
             src={tutor.avatar ? 'https://web.pinpaya.com/storage/' + tutor.avatar : "https://app.pinpaya.com/no-image.png"}
             alt=""/>
        <div className={s.textBlock}>

          <h2 className={s.name}>{tutor.name} {tutor.lastname}</h2>

          {tutor.status === 0 &&
            <p className="text-danger">Not accepting lessons</p>
          }
          <p>{tutor.location}</p>

          <div className={s.attrsBlock}>
            <div className={s.attrs}>
              <div className={s.attrLabel}>{t('teaches')}:</div>
              <div className={s.attrValue}>
                {tutor.subject && tutor.subject.map((item, index) =>
                  <span key={index}>{index !== 0 ? ', ' : ''}{item.name}</span>)}
              </div>
            </div>

            <div className={s.attrs}>
              <div className={s.attrLabel}>{t('experience')}:</div>
              <div className={s.attrValue}>
                {tutor.experience}
              </div>
            </div>

            <div className={s.attrs}>
              <div className={s.attrLabel}>{t('speaks')}:</div>
              <div className={s.attrValue}>
                {tutor.language && tutor.language.map((item, index) =>
                  <span key={index}>{index !== 0 ? ', ' : ''}{item.name}</span>)}
              </div>
            </div>
          </div>

          <h4 className={s.subtitle}>{t('about_me')}</h4>
          <p className={s.text}>{tutor.about}</p>

          <h4 className={s.subtitle}>{t('teach_style')}</h4>
          <p className={s.text}>{tutor.description}</p>

          {
            tutor.check_trial === 1 && <div>
              <h4 className={s.subtitle}>{t('trial_lesson')}:</h4>
              <p className={s.text}> {t('first_lesson_50')}</p>
            </div>
          }

          {
            tutor.check_teach === 1 && <div>
              <h4 className={s.subtitle}>{t('teach_only_kids')}</h4>
            </div>
          }

          {
            certificates?.length > 0 && <div className={s.certs}>
              <h3 className={s.certTitle}>{t('certificates')}</h3>


              <ul className={s.certsList}>
                {
                  certificates.map(item =>
                    <li className={s.certItem} key={item.id}>
                      <a target="_blank" href={`https://web.pinpaya.com/storage/${item.images}`}><img
                         src={'https://web.pinpaya.com/storage/' + item.images} width="150" alt="certificate"/></a>
                    </li>
                  )
                }
              </ul>
            </div>
          }
        </div>
      </div>

    </>
  );
};

export default TutorDesc;

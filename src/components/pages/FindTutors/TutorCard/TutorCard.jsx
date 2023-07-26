import s from './TutorCard.module.scss';
import {Link} from "react-router-dom";
import childIcon from '../../../../assets/findTutor/child.svg'
import startGold from '../../../../assets/findTutor/star12gold.svg'

import {useTranslation} from "react-i18next";
import firebaseCreateChat from "../../../../hooks/firebaseCreateChat";
import {useContext} from "react";
import {AuthContext} from "../../../../contexts/AuthContext";
import {useStateContext} from "../../../../contexts/ContextProvider";

const TutorCard = ({item}) => {

  const {t, i18n} = useTranslation();
  const {currentUser} = useContext(AuthContext);
  const {type, user} = useStateContext();

  const message = (tutor) => {

    firebaseCreateChat(currentUser, tutor, user);
    document.getElementsByClassName('messageTrigger')[0].click();
  }

  return (
    <>
      <div className={s.tutorCard}>

        <Link to={'/tutor/' + item.id}>
          <img className={s.avatar}
               src={item.avatar ? 'https://web.pinpaya.com/storage/' + item.avatar : "https://app.pinpaya.com/no-image.png"}
               alt="avatar"/>
        </Link>


        <div className={s.descriptionWrapper}>
          <div>
            <h3 className={s.title}>
              <Link to={'/tutor/' + item.id}>{item.name}</Link>
              {
                item.check_teach === 1 && <img className={s.childIcon} src={childIcon} alt="child"/>
              }
            </h3>
          </div>
          <div className={s.location}>{item.location}</div>

          <div className={s.desc}>
            <div className={s.descRowWrapper}>
              <span className={s.descLabel}>
                {t('teaches')}:
              </span>
              <span className={s.descValue}>
                {item.subject.map((item, index) => <span key={index}>{index !== 0 ? ', ' : ''}{item.name}</span>)}
              </span>
            </div>

            <div className={s.descRowWrapper}>
              <span className={s.descLabel}>
                {t('speaks')}:
              </span>
              <span className={s.descValue}>
                  {item.language.map((item, index) => <span key={index}>{index !== 0 ? ', ' : ''}{item.name} </span>)}
              </span>
            </div>
          </div>
        </div>

        <div className={s.priceBlock}>
          <div className={s.price}>
            <img src={startGold} alt="star" className={s.star}/>
            {item.price} €
          </div>
          <div className={s.perHourText}>{t(item.check_trial === 1 ? t('first_trial') : t('per_hour'))}</div>
        </div>

        <div className={s.buttonsBlock}>

          <button className={s.messageBtn} onClick={() => message(item)}>
            {t('message')}
          </button>

          {
            item.check_trial === 0 ?
              <Link to={'/tutor/' + item.id} className={s.scheduleBtnOrange}>
                {t('schedule_lessons')}
              </Link> :

              <Link to={'/tutor/' + item.id} className={s.scheduleBtnGreen}>
                {t('schedule_trial_lesson')}
              </Link>
          }
        </div>
      </div>
    </>
  )
};

export default TutorCard;

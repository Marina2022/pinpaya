import React, {useContext, useState} from 'react';
import {useTranslation} from "react-i18next";
import firebaseCreateChat from "../../../../hooks/firebaseCreateChat";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {AuthContext} from "../../../../contexts/AuthContext";

import s from './BookingDetails.module.scss'
import star from '../../../../assets/star12gold.svg'
import garant from '../../../../assets/guarantee.svg'
import starBlack from '../../../../assets/star-black.svg'
import messageIcon from '../../../../assets/header/chat.svg'
import BigOrangeBtn from "../../../CommonComponents/BigOrangeBtn/BigOrangeBtn";
import cn from "classnames";
import CheckoutModal from "../CheckoutModal/CheckoutModal";


const scrollTo = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
const BookingDetails = ({tutor, getData, selected, setSelected, show, setShow}) => {
  const {t, i18n} = useTranslation();
  const {user} = useStateContext();
  const {currentUser} = useContext(AuthContext);

  const message = () => {
    firebaseCreateChat(currentUser, tutor, user);
    document.getElementsByClassName('messageTrigger')[0].click();
  }

  return (
    <>
      <div>
        <div className={s.details}>
          <p className={s.rating}>{t('average_rating')} <img className={s.starIcon} src={star} alt="star"/> <span
            className={s.dash}>-</span></p>

          <div className={s.priceWrapper}>
            <span className={s.price}>
              {
                tutor.check_trial === 1 && <span className={s.oldPrice}>{tutor.price} €</span>
              }
              {tutor.check_trial === 1 ? tutor.price / 2 : tutor.price} €
            </span>
            <span className={s.trialLesson}>{tutor.check_trial === 1
              ? `/${t('first_trial')}`
              : `/${t('per_hour')}`}</span>
          </div>

          <BigOrangeBtn classname={s.scheduleBtn} onClick={scrollTo}>
            {t('schedule_lessons')}
          </BigOrangeBtn>

          <div className={s.garantWrapper}>
            <img src={garant} style={{width: '40px', marginRight: '5px'}}/>
            <div>
              <div className={s.garantTitle}>{t('tutor_page_3')}</div>
              <div className={s.garantText}>{t('tutor_page_4')}</div>
            </div>
          </div>

          {user &&
            <button className={s.greyBtn} onClick={message}>
              <img className={s.btnIcon} src={messageIcon}
                   alt="icon"/> {t('leave_first_review')}
            </button>
          }
          <button className={s.greyBtn}>
            <img className={s.btnIcon} src={starBlack}
                 alt="icon"/> {t('read_reviews')} (0)
          </button>

        </div>

        {user &&
          <div className={s.firstReview}>
            <button className={cn(s.greyBtn, s.orangeBtn)}>
              {t('leave_first_review')}
            </button>
          </div>
        }
      </div>

      <CheckoutModal show={show} setShow={setShow} tutor={tutor} getData={getData} selected={selected} setSelected={setSelected} />
    </>
  );
};

export default BookingDetails;

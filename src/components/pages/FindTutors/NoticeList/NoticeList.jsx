import React, {useState} from 'react';
import s from "./NoticeList.module.scss";
import {useTranslation} from "react-i18next";
import find1 from '../../../../assets/findTutor/find1.svg'
import find2 from '../../../../assets/findTutor/find2.svg'
import find3 from '../../../../assets/findTutor/find3.svg'
import find4 from '../../../../assets/findTutor/find4.svg'
import InfoPopup from "./InfoPopup/InfoPopup";

const NoticeList = () => {

  const {t, i18n} = useTranslation();

  const [popupIsShown, setPopupIsShown] = useState(false)
  const [popupIndex, setPopupIndex] = useState(null)

  const handleNoticeClick = (popupIndex) => {
    setPopupIndex(popupIndex)
    setPopupIsShown(true)
  }

  const handlePopupClose = ()=>{
    setPopupIsShown(false)
  }

  return (
    <div>

      <InfoPopup popupIndex={popupIndex} isOpen={popupIsShown} handleClose={handlePopupClose}/>

      <section className={s.notice}>
        <ul className={s.noticeList}>
          <li className={s.noticeItem} onClick={() => handleNoticeClick(0)}>
            <img className={s.noticeImage} src={find1} alt="icon" width="46" height="40"/>
            <span>{t('find_tutor_text1')}</span>
          </li>

          <li className={s.noticeItem} onClick={() => handleNoticeClick(1)}>
            <img className={s.noticeImage} src={find2} alt="icon" width="46" height="40"/>
            <span>{t('find_tutor_text2')}</span>
          </li>

          <li className={s.noticeItem} onClick={() => handleNoticeClick(2)}>
            <img className={s.noticeImage} src={find3} alt="icon" width="46" height="40"/>
            <span>{t('find_tutor_text3')}</span>
          </li>

          <li className={s.noticeItem} onClick={() => handleNoticeClick(3)}>
            <img className={s.noticeImage} src={find4} alt="icon" width="46" height="40"/>
            <span>{t('find_tutor_text4')}</span>
          </li>
        </ul>
      </section>

    </div>
  );
};

export default NoticeList;

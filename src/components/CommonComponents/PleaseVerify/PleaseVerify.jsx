import React from 'react';
import s from './PleaseVerify.module.scss';
import BigOrangeBtn from "../BigOrangeBtn/BigOrangeBtn";
import {useTranslation} from "react-i18next";



const PleaseVerify = ({resendLink}) => {

  const {t, i18n} = useTranslation();

  return (
    <div className={s.verify} role="alert">
      <h4 className="text-dark">{t('verif_account')}</h4>
      <h6>
        <BigOrangeBtn onClick={resendLink} classname={s.verifyBtn}
        >{t('resend_link')}</BigOrangeBtn>
      </h6>
    </div>
  );
};

export default PleaseVerify;

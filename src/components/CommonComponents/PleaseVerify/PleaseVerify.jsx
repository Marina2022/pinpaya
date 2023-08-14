import React from 'react';
import s from './PleaseVerify.module.scss';
import {useTranslation} from "react-i18next";
import cn from "classnames";

const PleaseVerify = ({resendLink, classname, isSending}) => {

  const {t, i18n} = useTranslation();

  return (
    <div className={cn(s.verify, classname)} role="alert">
      <span>  {t('verif_account')}. </span>
      <a className={s.resendLink} style={{opacity: isSending ? .5 : 1}} onClick={resendLink}>{t('resend_link')}</a>
    </div>
  );
};

export default PleaseVerify;

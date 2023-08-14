import React from 'react';
import s from './StudentDontSee.module.scss';
import {useTranslation} from "react-i18next";
import cn from "classnames";
import {Link} from "react-router-dom";

const StudentDontSee = ({resendLink, classname}) => {

  const {t, i18n} = useTranslation();
  return (
    <div className={cn(s.verify, classname)} role="alert">
      <span>  {t('students_will_not_see')} </span>
      <Link to='my-tutor-profile' className={s.resendLink}>{t('update_my_tutor_profile')}</Link>
    </div>
  );
};

export default StudentDontSee;

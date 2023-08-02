import s from './LessonsEmpty.module.scss'
import {InfoCircle} from "react-bootstrap-icons";
import React from "react";
import {useTranslation} from "react-i18next";

const LessonsEmpty = () => {
  const {t, i18n} = useTranslation();

  return (
    <div className={s.wrapper}>
      <h4>{t('lessons_empty')}</h4>
    </div>
  );
};

export default LessonsEmpty;

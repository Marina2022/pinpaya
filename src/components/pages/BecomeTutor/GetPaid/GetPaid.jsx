import s from './GetPaid.module.scss';
import {useTranslation} from "react-i18next";
import BigOrangeBtn from "../../../CommonComponents/BigOrangeBtn/BigOrangeBtn";

const GetPaid = () => {
  const {t, i18n} = useTranslation();

  return (
    <div className={s.getPaid}>
      <h2 className={s.title} >{t('get_paid_to')}</h2>
      <h4 className={s.subtitle}>{t('earn_money')}</h4>
      <BigOrangeBtn classname={s.btn} onClick={()=>window.scroll(0,0)}>{t('register_as')}</BigOrangeBtn>
    </div>
  );
};

export default GetPaid;

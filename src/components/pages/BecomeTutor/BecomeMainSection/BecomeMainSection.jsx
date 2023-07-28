import s from './BecomeMainSection.module.scss';
import icon1 from "../../../../assets/becomeTutor/icon1.svg";
import icon2 from "../../../../assets/becomeTutor/icon2.svg";
import icon3 from "../../../../assets/becomeTutor/icon3.svg";
import {useTranslation} from "react-i18next";
import BecomeTutorForm from "./BecomeTutorForm/BecomeTutorForm";


const BecomeMainSection = () => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <div className={s.becomeTutorMain}>
        <BecomeTutorForm/>

        <ul className={s.advantages}>
          <li className={s.advantagesItem}>
            <div>
              <img className={s.iconWrapper} src={icon1} alt="benefits icon"/>
            </div>
            <div className={s.itemDesc}>
              <h4 className={s.itemTitle}>{t('become1')}</h4>
              <p className={s.itemText}>{t('become2')}</p>
            </div>
          </li>

          <li className={s.advantagesItem}>
            <div>
              <img className={s.iconWrapper} src={icon2} alt="benefits icon"/>
            </div>
            <div className={s.itemDesc}>
              <h4 className={s.itemTitle}>{t('become3')}</h4>
              <p className={s.itemText}>{t('become4')}</p>
            </div>
          </li>

          <li className={s.advantagesItem}>
            <div>
              <img className={s.iconWrapper} src={icon3} alt="benefits icon"/>
            </div>
            <div className={s.itemDesc}>
              <h4 className={s.itemTitle}>{t('become5')}</h4>
              <p className={s.itemText}>{t('become6')}</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default BecomeMainSection;

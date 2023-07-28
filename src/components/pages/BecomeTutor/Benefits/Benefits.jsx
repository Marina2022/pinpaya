import s from './Benefits.module.scss';
import {useTranslation} from "react-i18next";

import benefitsImg1 from '../../../../assets/becomeTutor/how3.webp'
import benefitsImg2 from '../../../../assets/becomeTutor/become2.webp'

const Benefits = () => {
  const {t, i18n} = useTranslation();
  return (
    <div className="container-1312">

      <div className={s.tutorBenefits}>
        <div className={s.benefitsDesc}>
          <h3 className={s.benTitle}>
            {t('our_benefits')}
          </h3>
          <ul className={s.benListList}>
            <li className={s.benItem}>{t('become7')}</li>
            <li className={s.benItem}>{t('become8')}</li>
            <li className={s.benItem}>{t('become9')}</li>
            <li className={s.benItem}>{t('become10')}</li>
          </ul>
        </div>
        <div className={s.tutorImgWrapper}>
          <img className={s.tutorBenImg} src={benefitsImg1} alt=""/>
        </div>
      </div>

      <div className={s.studentBenefits}>

        <div className={s.studentImgWrapper}>
          <img className={s.studentBenImg} src={benefitsImg2} alt=""/>
        </div>

        <div className={s.studentBenefitsDesc}>
          <h3 className={s.benTitle}>
            {t('teach_student_from')}
          </h3>
          <ul className={s.benListList}>
            <li className={s.benItem}>{t('become11')}</li>
            <li className={s.benItem}>{t('become12')}</li>
            <li className={s.benItem}>{t('become13')}</li>
            <li className={s.benItem}>{t('become14')}</li>
            <li className={s.benItem}>{t('become15')}</li>
            <li className={s.benItem}>{t('become16')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Benefits;

import s from './Footer.module.scss';
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";

import paypal from '../../../assets/footer/paypal.svg'
import visa from '../../../assets/footer/visa.svg'
import mastercard from '../../../assets/footer/mastercard.svg'

const Footer = () => {
  const {t, i18n} = useTranslation();

  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.topFooter}>
          <div>
            <Link className={s.footerLink} to="/about">{t('about_pinpaya')}</Link>
            <Link className={s.footerLink} to="/become-tutor">{t('become_private_tutor')}</Link>
            <Link className={s.footerLink} to="/find-tutor">{t('find_private_tutor')}</Link>
            <Link className={s.footerLink} to="/faq">FAQ</Link>
            <Link className={s.footerLink} to="/support">{t('support')}</Link>
            <Link className={s.footerLink} to="/blog">{t('blog')}</Link>
          </div>

          <div>
            <div className={s.needHelp}>{t('footer_1')}</div>
            <div className={s.desc}>{t('footer_2')}</div>
            <div className={s.email}>support@pinpaya.com</div>
          </div>

          <div>
            <div className={s.secure}>{t('secure_checkout')}</div>
            <div className={s.cardIcons}>
              <img src={visa} alt="visa"/>
              <img src={mastercard} alt="mastercard"/>
              <img src={paypal} alt="paypal"/>
            </div>
          </div>
        </div>

        <div className={s.bottomFooter}>
          <div>{t('footer_3')}</div>
          <a href="src/components/Footer/Footer">{t('footer_4')}</a>
          <div></div>
        </div>

      </div>
    </footer>


  );
};

export default Footer;

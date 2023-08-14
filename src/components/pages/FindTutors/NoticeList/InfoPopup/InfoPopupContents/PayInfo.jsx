import s from './InfoPopupContents.module.scss';

const PayInfo = ({lang}) => {

  return (
    <>
      {
        lang ==='en' && <div className={s.wrapper}>
          <h3 className={s.title}>How you can pay for lessons</h3>
          <p className={s.text}>First, you schedule your lesson with a tutor to see if you like them. If you like the tutor, you can then buy a set of hours with them. Your tutor will help you understand how many hours per week or month you’ll need to reach your goals. The more hours you buy, the bigger the discount from Pinpaya.</p>
          <h3 className={s.title}>A few more things to keep in mind:</h3>
          <ul className={s.list}>
            <li className={s.listItem}>
              You can cancel or reschedule any lesson for free
            </li>
            <li className={s.listItem}>
              You can pay for lessons with a bank card
            </li>
            <li className={s.listItem}>
              If your lesson does not take place, or you are not satisfied with the tutor, we will provide you with a free replacement to another tutor of your choice or offer you a full refund.
            </li>
            <li className={s.listItem}>
              Payment outside of Pinpaya platform is prohibited
            </li>
          </ul>
        </div>
      }

      {
      lang === 'ru' && <div className={s.wrapper}>
          <h3 className={s.title}>Как можно оплатить занятия</h3>
          <p className={s.text}>Если Вам понравился какой-то из учителей и вы решили заниматься дальше, то в календаре в профиле учителя  выбрав дату и время Вы можете забронировать последующие уроки с преподавателем.</p>
          <h3 className={s.title}>Некоторые вещи, которые нужно помнить:</h3>
          <ul className={s.list}>
            <li className={s.listItem}>
              Вы можете отменить или перенести урок бесплатно
            </li>
            <li className={s.listItem}>
              Вы можете оплатить уроки через ваш банк, карту или paypal
            </li>
            <li className={s.listItem}>
              Если урок не состоялся или вы остались недовольны учителем, не расстраивайтесь! Pinpaya вернет деньги на ваш внутренний кошелек и вы сможете поменять учителя или  по запросу мы можем вернуть деньги вам на карту.
            </li>
            <li className={s.listItem}>
              Оплата вне платформы Pinpaya запрещена
            </li>
          </ul>
        </div>
      }

      {
      lang === 'et' && <div className={s.wrapper}>
          <h3 className={s.title}>Kuidas õppetundide eest maksta?</h3>
          <p className={s.text}>Kui mõni õpetaja teile meeldis ja otsustasite edasi õppida, siis õpetaja profiilis olevas kalendris saate kuupäeva ja kellaaja valides broneerida õpetaja juures järgmised tunnid.</p>
          <h3 className={s.title}>Mõned asjad, mida meeles pidada:</h3>
          <ul className={s.list}>
            <li className={s.listItem}>
              Saate tunni tasuta tühistada või ümber ajada
            </li>
            <li className={s.listItem}>
              Õppetundide eest saab tasuda oma panga, kaardi või paypali kaudu
            </li>
            <li className={s.listItem}>
              Kui tund ei toimunud või te ei olnud õpetajaga rahul, ärge heitke meelt! Pinpaya tagastab raha teie sisemisse rahakotti ja saate õpetajat vahetada või soovi korral saame raha teie kaardile tagastada.
            </li>
            <li className={s.listItem}>
              Maksed väljaspool Pinpaya platvormi on keelatud
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export default PayInfo;

import s from './InfoPopupContents.module.scss';

const PayInfo = ({lang}) => {

  return (
    <>
      {
        lang ==='en' && <div className={s.wrapper}>
          <h3 className={s.title}>100% full refund</h3>
          <p className={s.text}>If your lesson does not take place, or you are not satisfied with the tutor, we will provide you with a <strong>free replacement</strong>  to another tutor of your choice or offer you a <strong>full refund</strong>
          </p>
        </div>
      }

      {
      lang === 'ru' && <div className={s.wrapper}>
          <h3 className={s.title}>100% полный возврат</h3>
          Если урок не состоялся или вы остались недовольны учителем, не расстраивайтесь! Pinpaya <strong> вернет деньги на ваш внутренний кошелек</strong>  и вы сможете поменять учителя или&nbsp;по запросу мы можем <strong>вернуть деньги</strong>  вам на карту.
        </div>
      }

      {
      lang === 'et' && <div className={s.wrapper}>
          <h3 className={s.title}>100% raha tagasi</h3>
          Kui tund ei toimunud või te ei olnud õpetajaga rahul, ärge heitke meelt! Pinpaya <strong> tagastab raha teie sisemisse rahakotti</strong> ja saate õpetajat vahetada või soovi korral me saame <strong>saame raha teie kaardile tagastada </strong>
        </div>
      }
    </>
  );
};

export default PayInfo;

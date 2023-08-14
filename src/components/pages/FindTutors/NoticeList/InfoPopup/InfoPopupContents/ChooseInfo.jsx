import s from './InfoPopupContents.module.scss';

const ChooseInfo = ({lang}) => {

  return (
    <>
      {
        lang ==='en' && <div className={s.wrapper}>
          <h3 className={s.title}>How to choose an Ideal tutor</h3>
          <p className={s.text}>Think about why you’re looking for a tutor. Depending on your goal, use filters to find your perfect tutor faster:</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Choose the subject you want to study
            </li>
            <li className={s.listItem}>
              Set your comfortable price per hour
            </li>
            <li className={s.listItem}>
              Specify the time when you want to learn
            </li>
            <li className={s.listItem}>
              Sometimes if you have a specific questions it’s good to chat with the tutor before booking
            </li>
          </ul>
        </div>
      }

      {
      lang === 'ru' && <div className={s.wrapper}>
          <h3 className={s.title}>Как выбрать идеального репетитора</h3>
          <p className={s.text}>Прежде всего подумай, кто тебе действительно нужен. Выбери цель и отфильтруй учителей по параметрам:</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Выбери предмет, который хотел бы изучать
            </li>
            <li className={s.listItem}>
              Выбери приемлемую для себя цену часа
            </li>
            <li className={s.listItem}>
              В календаре  учителя выбери подходящее время, когда бы ты хотел провести урок
            </li>
            <li className={s.listItem}>
              Если вы имеешь какие-то дополнительные вопросы к учителю, то всегда можно отправить приватное сообщение в чат и пообщаться
            </li>
          </ul>
        </div>
      }

      {
      lang === 'et' && <div className={s.wrapper}>
          <h3 className={s.title}>Kuidas valida ideaalset juhendajat?</h3>
          <p className={s.text}>Kõigepealt mõelge, keda te tegelikult vajate. Valige sihtmärk ja filtreerige õpetajad parameetrite järgi:</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Valige aine, mida soovite õppida
            </li>
            <li className={s.listItem}>
              Valige endale sobiv tunnitasu
            </li>
            <li className={s.listItem}>
              Vali õpetaja kalendris õige aeg, millal soovid tundi anda
            </li>
            <li className={s.listItem}>
              Kui teil on õpetajale lisaküsimusi, võite alati saata vestlusesse ja vestlusesse privaatsõnumi
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export default ChooseInfo;

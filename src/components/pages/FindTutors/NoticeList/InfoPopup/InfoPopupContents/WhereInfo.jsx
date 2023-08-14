import s from './InfoPopupContents.module.scss';

const WhereInfo = ({lang}) => {

  return (
    <>
      {
        lang ==='en' && <div className={s.wrapper}>
          <h3 className={s.title}>Where lessons take place</h3>
          <p className={s.text}>Lessons take place in the Pinpaya classroom: the video platform that has everything you
            need
            for your lessons! No need to download other programs.</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Enjoy an easy-to-use video chat and messenger
            </li>
            <li className={s.listItem}>
              Upload files
            </li>
            <li className={s.listItem}>
              Share your screen
            </li>
            <li className={s.listItem}>
              Interactive whiteboard
            </li>
          </ul>
          <p>* If for some reason our Pinpaya classroom will not work for you, you can arrange with teachers to conduct a
            lesson on Skype, Zoom or Google Meet.</p>
        </div>
      }

      {
      lang === 'ru' && <div className={s.wrapper}>
          <h3 className={s.title}>Где проходят занятия</h3>
          <p className={s.text}>Уроки проходять в видео-классе Pinpaya прямо на нашем сайте! Для занятий не нужно скачивать отельных программ.</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Наслаждайся уроком через наш видео чат, а также отправляй сообщения в обычном чате
            </li>
            <li className={s.listItem}>
              Возможность загрузки файлов
            </li>
            <li className={s.listItem}>
              Возможность поделиться своим экраном
            </li>
            <li className={s.listItem}>
              Интерактиваная доска
            </li>
          </ul>
          <p>* Если по какой-то причине у вас не будет работать Pinpaya видео-класс, то вы можете договориться с учителем о проведении урока в Skype, Zoom or Google Meet.</p>
        </div>
      }

      {
      lang === 'et' && <div className={s.wrapper}>
          <h3 className={s.title}>Kus õppetunnid toimuvad</h3>
          <p className={s.text}>Tunnid toimuvad Pinpaya videoklassis otse meie kodulehel! Klasside jaoks ei pea te hotelliprogramme alla laadima.</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              Nautige õppetundi meie videovestluse kaudu ja saatke sõnumeid ka tavalises vestluses
            </li>
            <li className={s.listItem}>
              Võimalus faile üles laadida
            </li>
            <li className={s.listItem}>
              Võimalus oma ekraani jagada
            </li>
            <li className={s.listItem}>
              Interaktiivne tahvel
            </li>
          </ul>
          <p>* Kui Pinpaya videoklass teile mingil põhjusel ei sobi, võite õpetajaga leppida tunni läbi Skype'is, Zoomis või Google Meetis.</p>
        </div>
      }
    </>
  );
};

export default WhereInfo;

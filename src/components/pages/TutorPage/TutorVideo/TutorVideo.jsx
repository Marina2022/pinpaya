import React, {useEffect, useRef, useState} from 'react';
import s from './TutorVideo.module.scss'
import YouTube from 'react-youtube';

const TutorVideo = ({tutor}) => {

  const [utube, setUtube] = useState(null)
  const [showBtn, setShowBtn] = useState(true)

  const onPlayerReady = (event) => {
    setUtube(event.target)
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
      autohide: 1,
    },
  };

  const onEnd = () => {
    setShowBtn(true)
  };

  const onPlayBtnClick = () => {
    utube.playVideo();
    setTimeout(() => {
      setShowBtn(false)
    }, 300)
  }

  const ut = tutor.video_url.slice(tutor.video_url.lastIndexOf('/') + 1)

  // const cover =`http://img.youtube.com/vi/${ut}/3.jpg`
  const cover = `http://i.ytimg.com/vi/${ut}/sddefault.jpg`


  return (
    <>

      <div className={s.utubeWrapper}>
        <YouTube className={s.video} videoId={ut} opts={opts} onReady={onPlayerReady} onEnd={onEnd}/>

        {
          showBtn && <>
            <img className={s.img} src={cover} alt=""/>
          <button className={s.playBtn} onClick={onPlayBtnClick}></button>

          </>
        }
      </div>

      {/*<div>*/}
      {/*  <iframe className={s.video} src={tutor.video_url}*/}
      {/*          frameBorder="0" allowFullScreen={true}></iframe>*/}
      {/*</div>*/}
    </>
  );
};

export default TutorVideo;

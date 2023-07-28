import React from 'react';
import s from './TutorVideo.module.scss'

const TutorVideo = ({tutor}) => {
  return (
    <div>

        <iframe className={s.video}  src={tutor.video_url}
                frameBorder="0" allowFullScreen={true} ></iframe>

    </div>
  );
};

export default TutorVideo;

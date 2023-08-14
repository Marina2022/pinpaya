import s from './OurRegularPopup.module.scss';

const OurRegularPopup = ({children, isOpen, handleClose}) => {
  return (
    isOpen && <div>
      <div className='whiteOverlay' onClick={handleClose}>
      </div>
      <div className={s.popup}>
        <span className={s.closeBtn} onClick={handleClose}>×</span>
        {children}
      </div>
    </div>
  );
};

export default OurRegularPopup;

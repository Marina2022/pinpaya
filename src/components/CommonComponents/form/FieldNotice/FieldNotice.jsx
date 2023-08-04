import s from './FieldNotice.module.scss'

const FieldNotice = ({children}) => {
  return (
    <div className={s.notice}>
      {children}
    </div>
  );
};

export default FieldNotice;

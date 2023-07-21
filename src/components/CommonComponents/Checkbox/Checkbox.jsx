import s from './Checkbox.module.scss';

const Checkbox = ({value, onChange, label, id}) => {
  return (
    <div>
      <input className={s.checkInput} type="checkbox" value={value} onChange={onChange} id={id} checked={value} />
      <label className={s.checkLabel} htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;

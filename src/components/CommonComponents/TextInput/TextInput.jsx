import s from './TextInput.module.scss'

const TextInput = ({placeholder, value, onChange, icon}) => {
  return (
    <div className={s.inputWrapper}>
      {
        icon ? <img className={s.icon} src={icon} alt="icon"/> : null
      }
      <input className={s.input} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  );
};

export default TextInput;

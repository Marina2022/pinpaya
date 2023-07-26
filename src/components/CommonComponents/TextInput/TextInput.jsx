import s from './TextInput.module.scss'

const TextInput = ({placeholder, value, onChange, icon, ...rest}) => {
  return (
    <div className={s.inputWrapper}>
      {
        icon ? <img className={s.icon} src={icon} alt="icon"/> : null
      }
      <input {...rest} className={s.input} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  );
};

export default TextInput;

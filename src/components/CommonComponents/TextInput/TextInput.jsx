import s from './TextInput.module.scss'
import cn from "classnames";

const TextInput = ({placeholder, value, onChange, icon, classname, ...rest}) => {
  return (
    <div className={cn(s.inputWrapper, classname)}>
      {
        icon ? <img className={s.icon} src={icon} alt="icon"/> : null
      }
      <input {...rest} className={s.input} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  );
};

export default TextInput;

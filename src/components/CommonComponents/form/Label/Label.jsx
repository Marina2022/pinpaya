import s from './Label.module.scss'
import cn from "classnames";

const Label = ({classname, children, ...rest}) => {
  return (
    <label className={cn(s.label, classname)} {...rest}>
      {children}
    </label>
  );
};

export default Label;

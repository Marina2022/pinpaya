import s from './BigOrangeBtn.module.scss';
import {Link} from "react-router-dom";
import cn from "classnames";

const BigOrangeBtn = ({children, onBtnClick, to, classname, ...rest}) => {
  return (
    to ? (
        <Link to={to} className={cn(s.btn, classname)} onClick={onBtnClick}>
          {children}
        </Link>) :
      <button className={cn(s.btn, classname)} onClick={onBtnClick} {...rest} >
        {children}
      </button>
  )
}

export default BigOrangeBtn;

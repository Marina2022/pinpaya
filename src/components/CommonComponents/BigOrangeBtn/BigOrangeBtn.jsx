import s from './BigOrangeBtn.module.scss';
import {Link} from "react-router-dom";
import cn from "classnames";

const BigOrangeBtn = ({children, onBtnClick, to, classname}) => {
  return (
    to ? (
        <Link to={to} className={cn(s.btn, classname)} onClick={onBtnClick}>
          {children}
        </Link>) :
      <button className={cn(s.btn, classname)} onClick={onBtnClick}>
        {children}
      </button>
  )
}

export default BigOrangeBtn;
